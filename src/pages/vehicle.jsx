// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../components/sidebar';
// import Header from '../components/header';
// import Card from '../components/card';

// function Vehicle() {
//   const [vehicles, setVehicles] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       navigate('/');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const response = await fetch('http://192.168.1.4:1234/vehicle');
//         const data = await response.json();

//         if (data.data) {
//           setVehicles(data.data);
//         } else {
//           console.error('No vehicle data found');
//         }
//       } catch (error) {
//         console.error('Error fetching vehicles:', error);
//       }
//     };

//     fetchVehicles();
//   }, []);

//   const Handledel = async (id) => {
//     const Token = localStorage.getItem('accessToken');
//     console.log(id)

//     try {
//       const response = await fetch(`http://192.168.1.4:1234/vehicle/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${Token}`,
//         },
//       });

//       if (response.status === 200) {
//         const data = await response.json();
//         console.log("Vehicle deleted successfully:", data);
//         setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
//       } else {
//         console.log("Error deleting vehicle. Status code:", response.status);
//       }
//     } catch (error) {
//       console.log("An error occurred while deleting the vehicle:", error);
//     }
//   };

//   return (
//     <div className="h-[60vh] bg-[rgb(17,205,239)]">
//       <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
//         {/* Sidebar Section */}
//         <Sidebar />

//         {/* Main Content Section */}
//         <div className="p-5 m-3">
//           <Header />
//           <Card />

//           {/* Table container with fixed height and scroll */}
//           <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
//             <div className="flex flex-row justify-between mb-6">
//               <h2 className="text-xl font-bold text-gray-700">Vehicles</h2>
//               <button
//                 className="text-md font-bold text-gray-700 hover:text-gray-500 bg-green-400 flex items-center px-3 h-10"
//                 onClick={() => navigate('/vehicle/add')}
//               >
//                 Add Vehicle
//               </button>
//             </div>

//             {/* Scrollable table container */}
//             <div className="overflow-x-auto max-h-[calc(100vh-300px)]"> {/* Adjust height as needed */}
//               <table className="min-w-full">
//                 <thead className="sticky top-0 bg-white">
//                   <tr>
//                     <th className="px-4 py-2 text-left">Title</th>
//                     <th className="px-4 py-2 text-left">Brand</th>
//                     <th className="px-4 py-2 text-left">Type</th>
//                     <th className="px-4 py-2 text-left">Fuel Consumption</th>
//                     <th className="px-4 py-2 text-left">Description</th>
//                     <th className="px-4 py-2 text-left">Model</th>
//                     <th className="px-4 py-2 text-left">Vehicle Number</th>
//                     <th className="px-4 py-2 text-left">Status</th>
//                     <th className="px-4 py-2 text-left">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {vehicles.map((vehicle, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="px-4 py-2">
//                         <div className="flex items-center gap-4">
//                           <img
//                             className="w-12 h-12 rounded-full object-cover"
//                             src={vehicle.image[0] ? `http://192.168.1.4:1234/uploads/${vehicle.image[0]}` : "https://via.placeholder.com/150"}
//                             alt={vehicle.title || 'Vehicle'}
//                           />
//                           <div>
//                             <span className="font-semibold">{vehicle.title}</span>
//                             <br />
//                             {vehicle.brand}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-2 border-b">{vehicle.brand}</td>
//                       <td className="px-4 py-2 border-b">{vehicle.type}</td>
//                       <td className="px-4 py-2 border-b">{vehicle.fuelConsumption}</td>
//                       <td className="px-4 py-2 border-b">{vehicle.description}</td>
//                       <td className="px-4 py-2 border-b">{vehicle.model}</td>
//                       <td className="px-4 py-2 border-b">{vehicle.vehicleNumber}</td>
//                       <td className="px-4 py-2 border-b">{vehicle.status}</td>
//                       <td className="px-4 py-2 border-b flex mt-6">
//                         <button
//                           className="text-green-500 hover:underline"
//                           onClick={() => navigate(`/vehicle/edit/${vehicle._id}`)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="text-red-500 hover:underline ml-2"
//                           onClick={() => Handledel(vehicle._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Vehicle;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Card from '../components/card';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://192.168.1.4:1234/vehicle');
        const data = await response.json();

        if (data.data) {
          setVehicles(data.data);
        } else {
          console.error('No vehicle data found');
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const Handledel = async (id) => {
    const Token = localStorage.getItem('accessToken');
    console.log(id);

    try {
      const response = await fetch(`http://192.168.1.4:1234/vehicle/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Vehicle deleted successfully:", data);
        setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
      } else {
        console.log("Error deleting vehicle. Status code:", response.status);
      }
    } catch (error) {
      console.log("An error occurred while deleting the vehicle:", error);
    }
  };


  const getMaintenanceStats = () => {
    const now = new Date();
  
    let overdue = 0;
    let upcoming = 0;
    let onTime = 0;
  
    vehicles.forEach(vehicle => {
      const last = new Date(vehicle.lastMaintenance);
      const next = new Date(vehicle.nextMaintenance);
  
      if (isNaN(next)) return;
  
      if (next < now) {
        overdue++;
      } else if ((next - now) / (1000 * 60 * 60 * 24) <= 30) {
        upcoming++;
      } else {
        onTime++;
      }
    });
  
    return [overdue, upcoming, onTime];
  };
  
  const maintenanceStats = getMaintenanceStats();
  
  const pieData = {
    labels: ['Overdue', 'Upcoming (30 days)', 'On Time'],
    datasets: [
      {
        label: 'Maintenance Status',
        data: maintenanceStats,
        backgroundColor: ['#f87171', '#facc15', '#34d399'],
        borderColor: ['#f87171', '#facc15', '#34d399'],
        borderWidth: 1,
      },
    ],
  };
  
  
  // Pagination logic
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);
  const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);

  return (
    <div className="h-[60vh] bg-[rgb(17,205,239)]">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        {/* Sidebar Section */}
        <Sidebar />

        {/* Main Content Section */}
        <div className="p-5 m-3">
          <Header />
          <Card />

          {/* Table container with fixed height and scroll */}
          <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-row justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-700">Vehicles</h2>
              <button
                className="text-md font-bold text-gray-700 hover:text-gray-500 bg-green-400 flex items-center px-3 h-10"
                onClick={() => navigate('/vehicle/add')}
              >
                Add Vehicle
              </button>
            </div>

            {/* Scrollable table container */}
            <div className="overflow-x-auto max-h-[calc(100vh-300px)]"> {/* Adjust height as needed */}
              <table className="min-w-full">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Brand</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Fuel Consumption</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Model</th>
                    <th className="px-4 py-2 text-left">Vehicle Number</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentVehicles.map((vehicle, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={vehicle.image[0] ? `http://192.168.1.4:1234/uploads/${vehicle.image[0]}` : "https://via.placeholder.com/150"}
                            alt={vehicle.title || 'Vehicle'}
                          />
                          <div>
                            <span className="font-semibold">{vehicle.title}</span>
                            <br />
                            {vehicle.brand}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-b">{vehicle.brand}</td>
                      <td className="px-4 py-2 border-b">{vehicle.type}</td>
                      <td className="px-4 py-2 border-b">{vehicle.fuelConsumption}</td>
                      <td className="px-4 py-2 border-b">{vehicle.description}</td>
                      <td className="px-4 py-2 border-b">{vehicle.model}</td>
                      <td className="px-4 py-2 border-b">{vehicle.vehicleNumber}</td>
                      <td className="px-4 py-2 border-b">{vehicle.status}</td>
                      <td className="px-4 py-2  flex align-center mt-4">
                        <button
                          className="text-green-500 hover:underline"
                          onClick={() => navigate(`/vehicle/edit/${vehicle._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:underline ml-2"
                          onClick={() => Handledel(vehicle._id)}
                        >
                          Delete
                        </button>
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
   


            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === idx + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">Maintenance Status</h3>
    <Pie data={pieData} />
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
