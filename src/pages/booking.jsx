// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of Next.js useRouter
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faBell, faImages, faMoneyBillWave, faHome } from '@fortawesome/free-solid-svg-icons';
// import Sidebar from '../components/sidebar';
// import Header from '../components/header';
// import Card from '../components/card';

// function Booking() {
//   const [activeMenu, setActiveMenu] = useState('users');
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate(); // useNavigate from React Router

//   useEffect(() => {
//     // Check if accessToken exists in localStorage
//     const token = localStorage.getItem('accessToken');

//     if (!token) {
//       // Redirect to login if no token found
//       navigate('/'); // Use navigate instead of router.push
//     }
//   }, [navigate]);

//   useEffect(() => {
//     // Fetch users from the API
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://192.168.1.4:1234/booking');
//         const data = await response.json();
//         setUsers(data.data);
//         console.log(data)
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleMenuClick = (menu, route) => {
//     setActiveMenu(menu);
//     navigate(route); // Use navigate to redirect
//   };

//   const Handledel = async (id) => {
//     // try {
//     //   const response = await fetch(`http://192.168.0.108:1234/users/deleteAccount`, {
//     //     method: 'DELETE',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(id),
//     //   });

//     //   if (response.status === 200) {
//     //     const data = await response.json();
//     //     console.log("User deleted successfully:", data);
//     //   } else {
//     //     console.log("Error deleting account. Status code:", response.status);
//     //   }
//     // } catch (error) {
//     //   console.log("An error occurred while deleting the account:", error);
//     // }
//   };

//   return (
//     <div>
//       <div className="bg-[rgb(17,205,239)] h-[60vh]">
//         <div className="grid grid-cols-[300px_1fr] gap-4">
//          <Sidebar/>

//           {/* Main Content Section */}
//           <div className="p-5 m-3">
//           <Header/>
//                    <Card/>
           
//             <div className='flex flex-row gap-10'>
//               {/* Users Table */}
//               <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
//                 <div className='flex flex-row justify-between'>
//                   <h2 className="text-xl font-bold text-gray-700 mb-6">Users</h2>
             
//                 </div>

//                 <table className="min-w-full table-auto">
//                   <thead>
//                     <tr>
//                       <th className="px-4 py-2 text-left">title</th>
//                       {/* <th className="px-4 py-2 text-left">description</th> */}
//                       {/* <th className="px-4 py-2 text-left">startDate</th>
//                       <th className="px-4 py-2 text-left">endDate</th> */}
//                       <th className="px-4 py-2 text-left">price</th>
//                       <th className="px-4 py-2 text-left">status</th>
//                       <th className="px-4 py-2 text-left">isPaid</th>
//                       <th className="px-4 py-2 text-left">fuelConsumption</th>
//                       <th className="px-4 py-2 text-left">totalDistance</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.map((user, index) => (
//                       <tr key={index}>
//                         <td className="px-4 py-2">
//                           <div className="flex items-center gap-4">
//                             <img
//                               className="w-12 h-12 rounded-full object-cover"
//                               src={user.avatar || "https://via.placeholder.com/150"}
//                               alt="User Avatar"
//                             />
//                             {/* <div>
//                               <span className="font-semibold">{user.title}</span>
//                               <br />
//                               <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
//                                 {user.email}
//                               </a>
//                             </div> */}
//                           </div>
//                         </td>
//                         {/* <td className="px-4 py-2">{user.title}</td> */}
//                         {/* <td className="px-4 py-2">{user.description}</td> */}
//                         <td className="px-4 py-2">Rs:{Math.floor(user.price)}</td>
//                         {/* <td className="px-4 py-2">{user.startDate}</td>

//                         <td className="px-4 py-2">{user.endDate}</td> */}
//                         <td className="px-4 py-2">{user.status}</td>
//                         <td className="px-4 py-2">{user.isPaid}</td>
//                         <td className="px-4 py-2">{user.fuelConsumption} liter</td>
//                         <td className="px-4 py-2">{Math.floor(user.totalDistance)} km</td>
//                         <td className="px-4 py-2">
//                           <button className="text-blue-500 hover:underline" onClick={() => navigate(`/booking/edit/${user._id}`)}>Edit</button>
//                           <button className="text-blue-500 hover:underline ml-2" onClick={() => Handledel(user._id)}>Delete</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Booking;





import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Card from '../components/card';
import { fetchoneuser } from '../apis/api_1st';
function Booking() {
  const [activeMenu, setActiveMenu] = useState('users');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/'); // Redirect to login if no token
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://192.168.1.4:1234/booking');
        const data = await response.json();
        setUsers(data.data);
        console.log(' ',data.data.userId)
        const userData = await fetchoneuser(data.data.userId);
        console.log(userData,'userData')
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleMenuClick = (menu, route) => {
    setActiveMenu(menu);
    navigate(route);
  };

  const Handledel = async (id) => {
    // Handle deletion logic
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div>
      <div className="bg-[rgb(17,205,239)] h-[60vh]">
        <div className="grid grid-cols-[300px_1fr] gap-4">
          <Sidebar />

          {/* Main Content Section */}
          <div className="p-5 m-3">
            <Header />
            <Card />

            <div className='flex flex-row gap-10'>
              {/* Users Table */}
              <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
                <div className='flex flex-row justify-between'>
                  <h2 className="text-xl font-bold text-gray-700 mb-6">Bookings</h2>
                </div>

                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Title</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      {/* <th className="px-4 py-2 text-left">Is Paid</th> */}
                      <th className="px-4 py-2 text-left">Fuel Consumption</th>
                      <th className="px-4 py-2 text-left">Total Distance</th>
                      <th className="px-4 py-2 text-left">Action</th>
                      <th className="px-4 py-2 text-left">Track</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">
                          {user.title}
                        </td>
                        <td className="px-4 py-2">Rs: {Math.floor(user.price)}</td>
                        <td className="px-4 py-2">{user.status}</td>
                        {/* <td className="px-4 py-2">{user.isPaid ? "Paid" : "Unpaid"}</td> */}
                        <td className="px-4 py-2">{user.fuelConsumption} liter</td>
                        <td className="px-4 py-2">{Math.floor(user.totalDistance)} km</td>
                        <td className="px-4 py-2">
                          <button
                            className="text-green-500 hover:underline"
                            onClick={() => navigate(`/booking/edit/${user._id}`)}
                          >
                            Edit
                          </button>
                          {/* <button
                            className="text-red-500 hover:underline ml-2"
                            onClick={() => Handledel(user._id)}
                          >
                            Delete
                          </button> */}
                        </td>
                        <td className="px-4 py-2">
                        <button
                            className="text-green-500 hover:underline"
                            onClick={() => navigate(`/track/${user._id}`)}
                          >
                            Track
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              
            </div>

            {/* Pagination Controls */}
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
