import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Card from '../components/card';

function VehicleForm() {
  const [activeMenu, setActiveMenu] = useState('users');
  const [useriddata, setUseriddata] = useState('');
  const [Token, setToken] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '', // Image field
    vehicleNumber: '',
    type: '',
    brand: '',
    model: '',
    capacity: '',
    status: 'active',
    lastMaintenance: '',
    nextMaintenance: '',
    fuelConsumption: '',
    userId: '',
    coordinates: [40.7128, -74.0060], // Default coordinates (latitude, longitude)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const id = localStorage.getItem('userId');
    setToken(accessToken);
    setUseriddata(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.title || formData.title.length < 1) {
      alert('Title must be at least 1 character.');
      return;
    }

    if (!formData.vehicleNumber || formData.vehicleNumber.length < 1) {
      alert('Vehicle number must be at least 1 character.');
      return;
    }

    if (!formData.type || formData.type.length < 1) {
      alert('Type must be a valid string.');
      return;
    }

    // Format the date fields correctly
    let lastMaintenanceDate = formData.lastMaintenance ? new Date(formData.lastMaintenance).toISOString() : '';
    let nextMaintenanceDate = formData.nextMaintenance ? new Date(formData.nextMaintenance).toISOString() : '';

    // Prepare FormData object for multipart/form-data submission
    const vehicleData = new FormData();
    vehicleData.append('title', formData.title);
    vehicleData.append('description', formData.description);
    vehicleData.append('vehicleNumber', formData.vehicleNumber);
    vehicleData.append('type', formData.type);
    vehicleData.append('brand', formData.brand);
    vehicleData.append('model', formData.model);
    vehicleData.append('capacity', formData.capacity);
    vehicleData.append('status', formData.status);
    vehicleData.append('lastMaintenance', lastMaintenanceDate);
    vehicleData.append('nextMaintenance', nextMaintenanceDate);
    vehicleData.append('fuelConsumption', formData.fuelConsumption);
    vehicleData.append('userId', useriddata);
    const currentLocation = {
      coordinates: [formData.coordinates[0], formData.coordinates[1]]  // Ensure [latitude, longitude]
    };
    vehicleData.append('currentLocation', JSON.stringify(currentLocation));

    if (formData.image) {
      vehicleData.append('image', formData.image); // Append the image file
    }

    try {
      setIsSubmitting(true);
      console.log(vehicleData)
      const response = await fetch('http://192.168.1.7:1234/vehicle', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Token}`, // Send the token as Bearer token
        },
        body: vehicleData, // The FormData object containing all form fields, including the image
      });

      if (!response.ok) {
        const message = await response.text();
        console.error('Error message from API:', message);
        throw new Error(`Failed to fetch: ${message}`);
      }

      const result = await response.json();
      if (result) {
        alert('Vehicle added successfully!');
        navigate('/vehicle');
      } else {
        alert('Failed to add vehicle!');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] }); // Handle image file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;

    // Convert the input value to a float (if not already)
    const newValue = parseFloat(value);

    // Update the coordinate array based on the name of the field (latitude or longitude)
    setFormData((prevState) => ({
        ...prevState,
        coordinates: name === 'latitude'
            ? [newValue, prevState.coordinates[1]] // Update latitude (coordinates[0])
            : [prevState.coordinates[0], newValue], // Update longitude (coordinates[1])
    }));
};

  return (
    <div>
      <div className="bg-[rgb(17,205,239)] h-[60vh]">
        <div className="grid grid-cols-[300px_1fr] gap-4">
          <Sidebar />
          <div className="p-5 m-3 ">
            <Header />
            <Card />
            <div className="grid grid-cols gap-10 mt-3">
              <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
                <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
                  {/* Form fields for vehicle details */}
                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="title" className="text-gray-700 font-semibold">Vehicle Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter vehicle title"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="vehicleNumber" className="text-gray-700 font-semibold">Vehicle Number</label>
                      <input
                        type="text"
                        id="vehicleNumber"
                        name="vehicleNumber"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        placeholder="Enter vehicle number"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="description" className="text-gray-700 font-semibold">Description</label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter vehicle description"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="type" className="text-gray-700 font-semibold">Type</label>
                      <input
                        type="text"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="Enter vehicle type"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="brand" className="text-gray-700 font-semibold">Brand</label>
                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Enter vehicle brand"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="model" className="text-gray-700 font-semibold">Model</label>
                      <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Enter vehicle model"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="capacity" className="text-gray-700 font-semibold">Capacity</label>
                      <input
                        type="text"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        placeholder="Enter vehicle capacity"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="status" className="text-gray-700 font-semibold">Status</label>
                      <input
                        type="text"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        placeholder="Enter vehicle status"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="lastMaintenance" className="text-gray-700 font-semibold">Last Maintenance</label>
                      <input
                        type="date"
                        id="lastMaintenance"
                        name="lastMaintenance"
                        value={formData.lastMaintenance}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="nextMaintenance" className="text-gray-700 font-semibold">Next Maintenance</label>
                      <input
                        type="date"
                        id="nextMaintenance"
                        name="nextMaintenance"
                        value={formData.nextMaintenance}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="fuelConsumption" className="text-gray-700 font-semibold">Fuel Consumption</label>
                      <input
                        type="text"
                        id="fuelConsumption"
                        name="fuelConsumption"
                        value={formData.fuelConsumption}
                        onChange={handleChange}
                        placeholder="Enter fuel consumption"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  {/* Coordinates Section */}
                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="latitude" className="text-gray-700 font-semibold">Latitude</label>
                      <input
                        type="number"
                        id="latitude"
                        name="latitude"
                        step="any"
                        value={formData.coordinates[0]}
                        onChange={handleCoordinateChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="longitude" className="text-gray-700 font-semibold">Longitude</label>
                      <input
                        type="number"
                        id="longitude"
                        name="longitude"
                        step="any"
                        value={formData.coordinates[1]}
                        onChange={handleCoordinateChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="flex flex-col">
                    <label htmlFor="image" className="text-gray-700 font-semibold">Upload Image</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleForm;
