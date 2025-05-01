


import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Card from '../components/card';
import { fetchonevehicle, fetchoneuser } from '../apis/api_1st';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf6248b443068b80c24b18ba00bec208b8cdeb';

export default function Maps() {
  const { id } = useParams();
  const [users, setUsers] = useState({});
  const [vehicles, setVehicles] = useState({});
  const [driver, setDriver] = useState({});
  const [booking, setBooking] = useState({});
  const [error, setError] = useState('');
  const [route, setRoute] = useState([]);
  const [carPosition, setCarPosition] = useState(0); // Current position on the route (percentage)
  
  const markerRef = useRef(null); // Reference to the car marker for animation

  // Function to fetch the route from OpenRouteService API
  const fetchRoute = async (startLat, startLng, endLat, endLng) => {
    try {
      const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
        headers: {
          Authorization: OPENROUTESERVICE_API_KEY,
        },
        params: {
          start: `${startLng},${startLat}`,
          end: `${endLng},${endLat}`,
        },
      });
      
      const coords = response.data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);
      setRoute(coords);
    } catch (err) {
      console.error('Route fetch error:', err);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchBookingData = async () => {
      try {
        const res = await fetch(`http://192.168.1.4:1234/booking/details/${id}`);
        const data = await res.json();
        
        if (res.ok) {
          setBooking(data);

          if (data.userId) setUsers(await fetchoneuser(data.userId));
          if (data.driverId) setDriver(await fetchoneuser(data.driverId));
          if (data.vehicleId) setVehicles(await fetchonevehicle(data.vehicleId));

          if (data.startLocation?.coordinates?.length === 2 && data.endLocation?.coordinates?.length === 2) {
            const [startLng, startLat] = data.startLocation.coordinates;
            const [endLng, endLat] = data.endLocation.coordinates;
            fetchRoute(startLat, startLng, endLat, endLng);
          }
        } else {
          setError('Failed to fetch booking details');
        }
      } catch (err) {
        setError('Booking fetch error');
      }
    };

    fetchBookingData();
  }, [id]);



  
  // Function to animate the car marker
  const animateCar = () => {
    const speed = 60; // Speed in km/h
    const intervalTime = 100; // Time interval for each animation frame (ms)
    const distancePerFrame = (speed / 3600) * 1000 * (intervalTime / 1000); // Distance in meters per frame

    // Get the total length of the route (in meters)
    const totalDistance = route.reduce((acc, _, idx) => {
      if (idx === 0) return acc;
      const [prevLat, prevLng] = route[idx - 1];
      const [lat, lng] = route[idx];
      const distance = L.latLng(prevLat, prevLng).distanceTo(L.latLng(lat, lng));
      return acc + distance;
    }, 0);

    // Use setInterval to move the car along the route
    const intervalId = setInterval(() => {
      setCarPosition(prevPosition => {
        const nextPosition = prevPosition + distancePerFrame;
        if (nextPosition >= totalDistance) {
          clearInterval(intervalId); // Stop the animation when we reach the destination
          return totalDistance;
        }
        return nextPosition;
      });
    }, intervalTime);
  };

  useEffect(() => {
    if (route.length > 1 && booking.status === 'confirmed') {
        animateCar(); // Start animating the car when the route is ready
    }
  }, [route]);

  // Calculate the car's current position on the route
  const getCarLocation = () => {
    if (route.length === 0) return null;
    let distanceCovered = carPosition;
    for (let i = 1; i < route.length; i++) {
      const [lat1, lng1] = route[i - 1];
      const [lat2, lng2] = route[i];
      const segmentDistance = L.latLng(lat1, lng1).distanceTo(L.latLng(lat2, lng2));
      if (distanceCovered < segmentDistance) {
        const ratio = distanceCovered / segmentDistance;
        return L.latLng(
          lat1 + ratio * (lat2 - lat1),
          lng1 + ratio * (lng2 - lng1)
        );
      }
      distanceCovered -= segmentDistance;
    }
    return L.latLng(route[route.length - 1]); // End location
  };

  return (
    <div className="bg-[rgb(17,205,239)] min-h-screen">
      <div className="grid grid-cols-[300px_1fr] gap-4">
        <Sidebar />
        <div className="p-5 m-3">
          <Header />
          <Card />

          <div className="bg-white mt-8 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Booking Details</h2>
            {error && <div className="text-red-500">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {vehicles && (
                <div className="bg-white p-4 rounded shadow">
                  <img
                    src={vehicles.image ? `http://192.168.1.4:1234/uploads/${vehicles.image}` : 'https://via.placeholder.com/150'}
                    alt="Vehicle"
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="mt-2 text-lg font-semibold">{vehicles.name}</h3>
                  <p className="text-gray-600">Model: {vehicles.model}</p>
                </div>
              )}

              {users && (
                <div className="bg-white p-4 rounded shadow">
                  <img
                    src={users.image || 'https://via.placeholder.com/150'}
                    alt="User"
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="mt-2 text-lg font-semibold">{users.name}</h3>
                  <p className="text-gray-600">Phone: {users.phone}</p>
                </div>
              )}

              {driver && (
                <div className="bg-white p-4 rounded shadow">
                  <img
                    src={driver.image || 'https://via.placeholder.com/150'}
                    alt="Driver"
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="mt-2 text-lg font-semibold">{driver.name}</h3>
                  <p className="text-gray-600">Phone: {driver.phone}</p>
                </div>
              )}
            </div>

            {driver && route.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-2">Route Map</h3>
                <div className="h-[300px] w-full rounded overflow-hidden shadow border border-gray-200">
                  <MapContainer center={route[0]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* Car Marker with animation */}
                    <Marker position={getCarLocation()} ref={markerRef}
                    icon={L.icon({
                        iconUrl: `http://192.168.1.4:1234/uploads/${vehicles.image}`,
                        iconSize: [40, 40], // [width, height] in pixels
                        iconAnchor: [20, 40], // optional: point of the icon which will correspond to marker's location
                        popupAnchor: [0, -40], // optional: where the popup opens relative to the icon
                      })}>
                      <Popup>Start</Popup>
                    </Marker>

                    <Marker position={booking.endLocation.coordinates.slice().reverse()} 
                    icon={L.icon({
                        iconUrl: 'https://img.icons8.com/?size=100&id=19326&format=png&color=000000',
                        iconSize: [40, 40], // [width, height] in pixels
                        iconAnchor: [20, 40], // optional: point of the icon which will correspond to marker's location
                        popupAnchor: [0, -40], // optional: where the popup opens relative to the icon
                      })}>
                      <Popup>End</Popup>
                    </Marker>

                    <Polyline positions={route} pathOptions={{ color: 'green', weight: 4 }} />
                  </MapContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
