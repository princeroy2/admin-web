import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

export default function Vedit() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
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
    coordinates: [40.7128, -74.0060], 
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return; 

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://192.168.1.4:1234/vehicle/specific/${id}`);
        console.log(response);
        const data = await response.json();
        if (response.ok) {
            setFormData(data);
        } else {
          setError('Error fetching vehicle data');
        }
      } catch (err) {
        setError('An error occurred while fetching vehicle data');
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] }); // Handle image file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleUpdateVehicle = async (e) => {
  //   e.preventDefault();  

  //   setIsSubmitting(true); 

  //   const token = localStorage.getItem('accessToken'); 

  //   try {
  //     const response = await fetch(`http://192.168.1.4:1234/vehicle/${id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();
  //     console.log('API response:', data);

  //     if (response.ok) {
  //       navigate('/vehicle'); 
  //     } else {
  //       setError('Error updating vehicle');
  //     }
  //   } catch (err) {
  //     setError('An error occurred while updating vehicle data');
  //     console.error('API error:', err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleUpdateVehicle = async (e) => {
    e.preventDefault();  
  
    setIsSubmitting(true); 
  
    const token = localStorage.getItem('accessToken'); 
  
    // Create a FormData object to send the form data
    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('vehicleNumber', formData.vehicleNumber);
    form.append('type', formData.type);
    form.append('brand', formData.brand);
    form.append('model', formData.model);
    form.append('capacity', formData.capacity);
    form.append('status', formData.status);
    form.append('lastMaintenance', formData.lastMaintenance);
    form.append('nextMaintenance', formData.nextMaintenance);
    form.append('fuelConsumption', formData.fuelConsumption);
    form.append('userId', formData.userId);
    form.append('coordinates', JSON.stringify(formData.coordinates));  // You may want to send it as a string
  
    // If there's an image, append it to FormData
    if (formData.image) {
      form.append('image', formData.image);  // appending the file
    }
  
    try {
      const response = await fetch(`http://192.168.1.4:1234/vehicle/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set 'Content-Type' header, the browser will automatically handle it for FormData
        },
        body: form,
      });
  
      const data = await response.json();
      console.log('API response:', data);
  
      if (response.ok) {
        navigate('/vehicle');
      } else {
        setError('Error updating vehicle');
      }
    } catch (err) {
      setError('An error occurred while updating vehicle data');
      console.error('API error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <div className="bg-[rgb(17,205,239)] h-[60vh]">
        <div className="grid grid-cols-[300px_1fr] gap-4">
          {/* Sidebar Section */}
          <div className="bg-white p-6 m-3 rounded-lg shadow-lg h-[70vh] overflow-y-auto">
            <h1 className="text-gray-700 text-1xl text-center font-bold mb-6">FMS Truck Admin</h1>
            <div className="space-y-3">
              <div className="flex items-center p-3 gap-5" onClick={() => navigate('/dashboard')}>
                <img src="/dashbord.png" alt="Dashboard" className="object-cover w-8 h-8 rounded-l-lg" />
                <h2 className="text-gray-700 font-bold">Dashboard</h2>
              </div>

              <div className="flex items-center p-3 gap-5" onClick={() => navigate('/users')}>
                <img src="/users.png" alt="Users" className="object-cover w-10 h-10 rounded-l-lg" />
                <h2 className="text-gray-700 font-bold">Users</h2>
              </div>

              <div className="flex items-center p-3 gap-5" onClick={() => navigate('/vehicle')}>
                <img src="/admintruck.png" alt="Vehicle" className="object-cover w-10 h-10 rounded-l-lg" />
                <h2 className="text-gray-700 font-bold">Vehicle</h2>
              </div>

              <div className="flex items-center p-3 gap-5" onClick={() => navigate('/booking')}>
                <img src="/booking.png" alt="Booking" className="object-cover w-8 h-8 rounded-l-lg" />
                <h2 className="text-gray-700 font-bold">Booking</h2>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="p-5 m-3">
            <div className="flex flex-row justify-between items-center">
              <div>
                <FontAwesomeIcon icon={faHome} className="text-xl text-white mr-3 w-8" />
                <h1 className="text-white font-bold">Dashboard</h1>
              </div>
              <div>
                <FontAwesomeIcon icon={faUser} className="text-xl text-white mr-3 w-8" />
                <FontAwesomeIcon icon={faBell} className="text-xl text-white mr-3 w-8" />
              </div>
            </div>

            <div className="grid grid-cols gap-10 mt-3">
              <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-row justify-between">
                  <h2 className="text-xl font-bold text-gray-700 mb-6">Edit Vehicle</h2>
                </div>
                <form className="space-y-4 mb-6" onSubmit={handleUpdateVehicle}>
                  {/* Vehicle Form Fields */}
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
                        type="datetime-local"
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
                        type="datetime-local"
                        id="nextMaintenance"
                        name="nextMaintenance"
                        value={formData.nextMaintenance}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="fuelConsumption" className="text-gray-700 font-semibold">Fuel Consumption</label>
                    <input
                      type="text"
                      id="fuelConsumption"
                      name="fuelConsumption"
                      value={formData.fuelConsumption}
                      onChange={handleChange}
                      placeholder="Enter fuel consumption rate"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="image" className="text-gray-700 font-semibold">Vehicle Image</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>

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
