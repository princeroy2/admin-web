import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Card from '../components/card';
import { fetchvehical,patchvehicle, fetchdriver, userpatch } from '../apis/api_1st';

export default function BookingEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const manager = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    driverId: '',
    vehicleId: '',
    managerId:manager,
  });

    const [user, setUser] = useState({
      status: 'unactive',   
    });
  
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchUserData = async () => {
      // Fetch users (drivers)
      const usersData = await fetchdriver();
      setUsers(usersData);

      // Fetch vehicles
      const vehiclesData = await fetchvehical();
      setVehicles(vehiclesData.data);
      console.log(vehiclesData.data,'gaaaaaaaaaaaaaaaaaa')


      try {
        const response = await fetch(`http://192.168.1.5:1234/booking/details/${id}`);
        const data = await response.json();
        if (response.ok) {
          setFormData(data); // Set initial form data for driverId and vehicleId
        } else {
          setError('Error fetching booking data');
        }
      } catch (err) {
        setError('An error occurred while fetching booking data');
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const form = new FormData();
  form.append('status', 'unactive');
  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('accessToken');
    console.log(formData,'daorfrefnefndafbejf')
    console.log(token,'admin token')

    try {
      const response = await fetch(`http://192.168.1.5:1234/booking/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      await localStorage.setItem('assignedid', id);

      if (response.ok) {
        setSuccessMessage('Booking updated successfully!');
        console.log(data,'its vehicle id')
     
       const userpatc= await userpatch(user)
        // const patchResponse = await patchvehicle(data.data.vehicleId, form, token);
        console.log(userpatc, 'uuuuuuuuuuuuuuuuu');
        setTimeout(() => navigate('/booking'), 1000); // Navigate after success
      } else {
        setError('Error updating booking');
      }
    } catch (err) {
      setError('An error occurred while updating booking data');
      console.error('API error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="bg-[rgb(17,205,239)] h-[60vh]">
        <div className="grid grid-cols-[300px_1fr] gap-4">
          <Sidebar />
          <div className="p-5 m-3">
            <Header />
            <Card />

            <div className="grid grid-cols gap-10 mt-3">
              <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-row justify-between">
                  <h2 className="text-xl font-bold text-gray-700 mb-6">Edit Booking</h2>
                </div>

                {error && <div className="text-red-500">{error}</div>} {/* Display error */}
                {successMessage && <div className="text-green-500">{successMessage}</div>} {/* Display success */}

                <form className="space-y-4 mb-6" onSubmit={handleUpdateBooking}>
                  {/* Driver ID Field as a Select Dropdown */}
                  <div className="flex flex-col">
                    <label htmlFor="driverId" className="text-gray-700 font-semibold">Driver</label>
                    <select
                      id="driverId"
                      name="driverId"
                      value={formData.driverId}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select a driver</option>
                      {users.length > 0 && users.map((user) => (
                        <option key={user.id} value={user._id}>
                          {user.name} {/* Assuming 'name' is the user's display name */}
                        </option>
                      ))}
                    </select>
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
