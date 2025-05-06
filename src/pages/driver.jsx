// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of Next.js useRouter
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faBell, faImages, faMoneyBillWave, faHome } from '@fortawesome/free-solid-svg-icons';
// import Sidebar from '../components/sidebar';
// import Header from '../components/header';
// import Card from '../components/card';

// function Driver() {
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
//         const response = await fetch('http://192.168.1.5:1234/users/allUsers');
//         const data = await response.json();
        
//         // Filter users with role 'USER'
//         const filteredUsers = data.data.filter(user => user.role === 'DRIVER');
        
//         setUsers(filteredUsers);
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
//     const Token = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
//     console.log(id)

//     try {
//       const response = await fetch(`http://192.168.1.5:1234/users/deleteAccount/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           // 'Authorization': `Bearer ${Token}`, // Send the token as Bearer token
//         },
//       });

//       if (response.status === 200) {
//         // If the user is deleted successfully, remove it from the users state
//         setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
//       } else {
//         console.log("Error deleting account. Status code:", response.status);
//       }
//     } catch (error) {
//       console.log("An error occurred while deleting the account:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="bg-[rgb(17,205,239)] h-[60vh]">
//         <div className="grid grid-cols-[300px_1fr] gap-4">
//           <Sidebar link='users' />

//           {/* Main Content Section */}
//           <div className="p-5 m-3">
//             <Header />
//             <Card />

//             <div className='flex flex-row gap-10'>
//               {/* Users Table */}
//               <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
//                 <div className='flex flex-row justify-between'>
//                   <h2 className="text-xl font-bold text-gray-700 mb-6">Users</h2>
//                   <h2
//                     className="text-md font-bold text-gray-700 hover:cursor-pointer hover:text-gray-500 bg-green-400 flex items-center px-3 h-10"
//                     onClick={() => navigate('/Driver/add')}
//                   >
//                     Add User
//                   </h2>
//                 </div>

//                 <table className="min-w-full table-auto">
//                   <thead>
//                     <tr>
//                       <th className="px-4 py-2 text-left">Name</th>
//                       <th className="px-4 py-2 text-left">About</th>
//                       <th className="px-4 py-2 text-left">Status</th>
//                       <th className="px-4 py-2 text-left">Roll</th>
//                       <th className="px-4 py-2 text-left">Phone</th>
//                       <th className="px-4 py-2 text-left">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.map((user, index) => (
//                       <tr key={index}>
//                         <td className="px-4 py-2">
//                           <div className="flex items-center gap-4">
//                             <img
//                               className="w-12 h-12 rounded-full object-cover"
//                               src={user.avatar || "driver.png"}
//                               alt="User Avatar"
//                             />
//                             <div>
//                               <span className="font-semibold">{user.name}</span>
//                               <br />
//                               <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
//                                 {user.email}
//                               </a>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-2">{user.about}</td>
//                         <td className="px-4 py-2">{user.status}</td>
//                         <td className="px-4 py-2">{user.role}</td>
//                         <td className="px-4 py-2">{user.phone}</td>
//                         <td className="px-4 py-2">
//                           <button className="text-green-500 hover:underline" onClick={() => navigate(`/user/edit/${user._id}`)}>Edit</button>
//                           <button className="text-red-500 hover:underline ml-2" onClick={() => Handledel(user._id)}>Delete</button>
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

// export default Driver;



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Card from '../components/card';

function Driver() {
  const [activeMenu, setActiveMenu] = useState('users');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) navigate('/');
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://192.168.1.5:1234/users/allUsers');
        const data = await response.json();
        const filteredUsers = data.data.filter(user => user.role === 'DRIVER');
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const Handledel = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.5:1234/users/deleteAccount/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      } else {
        console.log("Error deleting account. Status code:", response.status);
      }
    } catch (error) {
      console.log("An error occurred while deleting the account:", error);
    }
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
          <Sidebar link='users' />

          <div className="p-5 m-3">
            <Header />
            <Card />

            <div className='flex flex-row gap-10'>
              <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
                <div className='flex flex-row justify-between'>
                  <h2 className="text-xl font-bold text-gray-700 mb-6">Drivers</h2>
                  <h2
                    className="text-md font-bold text-gray-700 hover:cursor-pointer hover:text-gray-500 bg-green-400 flex items-center px-3 h-10"
                    onClick={() => navigate('/Driver/add')}
                  >
                    Add Driver
                  </h2>
                </div>

                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">About</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-4">
                            <img
                              className="w-12 h-12 rounded-full object-cover"
                              src={user.avatar || "driver.png"}
                              alt="Driver Avatar"
                            />
                            <div>
                              <span className="font-semibold">{user.name}</span>
                              <br />
                              <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
                                {user.email}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 truncate">{user.about?.split(' ').slice(0, 5).join(' ')}</td>
                        <td className="px-4 py-2">{user.status}</td>
                        <td className="px-4 py-2">{user.role}</td>
                        <td className="px-4 py-2">{user.phone}</td>
                        <td className="px-4 py-2">
                          {/* <button className="text-green-500 hover:underline" onClick={() => navigate(`/user/edit/${user._id}`)}>Edit</button> */}
                          <button className="text-red-500 hover:underline ml-2" onClick={() => Handledel(user._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Driver;
