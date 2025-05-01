import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Card from '../components/card';

export default function EditUser() {
    const { id } = useParams();

  const navigate = useNavigate(); // Using React Router's useNavigate hook
 console.log(id)
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    about: '',
    status: '',   
  });

//   const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return; // Don't proceed if the ID is not available

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://192.168.1.4:1234/users/oneUser/${id}`);
        console.log(response)
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          setError('Error fetching user data');
        }
      } catch (err) {
        setError('An error occurred while fetching user data');
      } finally {
        // setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page

    console.log('Form submitted', user);

    // setLoading(true);
    const { _id, ...userData } = user; // Destructure and exclude _id

    const token = localStorage.getItem('accessToken'); // Replace with your actual token retrieval method
    console.log('tokeeeeeeeeeeeeeen',token)
    try {
      const response = await fetch(`http://192.168.1.4:1234/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass the token here, not the ID
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      console.log('API response:', data);

      if (response.ok) {
        navigate('/user'); // Redirect to users page after updating
      } else {
        setError('Error updating user');
      }
    } catch (err) {
      setError('An error occurred while updating user data');
      console.error('API error:', err);
    } finally {
    //   setLoading(false);
    }
  };

 

  return (
    <div>
      <div className="bg-[rgb(17,205,239)] h-[60vh]">
        <div className="grid grid-cols-[300px_1fr] gap-4">
          {/* Sidebar Section */}
        <Sidebar link={'user'}/>
       

          {/* Main Content Section */}
          <div className="p-5 m-3">
             <Header />
                        <Card />
       

            <div className="grid grid-cols gap-10 mt-3">
              <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-row justify-between">
                  <h2 className="text-xl font-bold text-gray-700 mb-6">Edit User</h2>
                </div>

                {/* User Form */}
                <form className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="name" className="text-gray-700 font-semibold">User Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        placeholder="Enter username"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Enter email"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                

                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="about" className="text-gray-700 font-semibold">About</label>
                      <input
                        type="text"
                        id="about"
                        name="about"
                        value={user.about}
                        onChange={(e) => setUser({ ...user, about: e.target.value })}
                        placeholder="Enter about"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="status" className="text-gray-700 font-semibold">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={user.status}
                        onChange={(e) => setUser({ ...user, status: e.target.value })}
                        className="border border-gray-300 rounded-md p-2"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="phone" className="text-gray-700 font-semibold">Phone</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        placeholder="Enter phone number"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleUpdateUser}
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUser, faBell } from '@fortawesome/free-solid-svg-icons';
// import { useParams } from 'react-router-dom';

// export default function EditUser() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     about: '',
//     status: '',
//     role: '', // Include role in state
//     avatar: '', // Image will be handled as a file
//   });

//   const [error, setError] = useState('');
//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`http://192.168.1.4:1234/users/oneUser/${id}`);
//         const data = await response.json();
//         if (response.ok) {
//           setUser(data);
//           setImagePreview(data.avatar); // Set the existing image
//         } else {
//           setError('Error fetching user data');
//         }
//       } catch (err) {
//         setError('An error occurred while fetching user data');
//       }
//     };

//     fetchUserData();
//   }, [id]);

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     const { _id, ...userData } = user;

//     const token = localStorage.getItem('accessToken');
//     const formData = new FormData();

//     // Append all other user data
//     Object.keys(userData).forEach((key) => {
//       formData.append(key, userData[key]);
//     });

//     // Append the image file if it exists
//     if (user.avatar) {
//       formData.append('avatar', user.avatar); // This is the image file key
//     }

//     try {
//       const response = await fetch(`http://192.168.1.4:1234/users`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         navigate('/user');
//       } else {
//         setError('Error updating user');
//       }
//     } catch (err) {
//       setError('An error occurred while updating user data');
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUser((prevState) => ({
//         ...prevState,
//         avatar: file, // Store the image file
//       }));

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result); // Set image preview
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <div className="bg-[rgb(17,205,239)] h-[60vh]">
//         <div className="grid grid-cols-[300px_1fr] gap-4">
//           {/* Sidebar */}
//           <div className="bg-white p-6 m-3 rounded-lg shadow-lg h-[70vh] overflow-y-auto">
//             <h1 className="text-gray-700 text-1xl text-center font-bold mb-6">FMS Truck Admin</h1>
//             <div className="space-y-3">
//               <div
//                 className="flex items-center p-3 gap-5"
//                 onClick={() => navigate('/dashboard')}
//               >
//                 <img src="/dashbord.png" alt="Dashboard" className="object-cover w-8 h-8 rounded-l-lg" />
//                 <h2 className="text-gray-700 font-bold">Dashboard</h2>
//               </div>
//               <div
//                 className="flex items-center p-3 gap-5"
//                 onClick={() => navigate('/user')}
//               >
//                 <img src="/users.png" alt="Users" className="object-cover w-10 h-10 rounded-l-lg" />
//                 <h2 className="text-gray-700 font-bold">Users</h2>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="p-5 m-3">
//             <div className="flex flex-row justify-between items-center">
//               <div>
//                 <FontAwesomeIcon icon={faHome} className="text-xl text-white mr-3 w-8" />
//                 <h1 className="text-white font-bold">Dashboard</h1>
//               </div>
//               <div>
//                 <FontAwesomeIcon icon={faUser} className="text-xl text-white mr-3 w-8" />
//                 <FontAwesomeIcon icon={faBell} className="text-xl text-white mr-3 w-8" />
//               </div>
//             </div>

//             <div className="grid grid-cols gap-10 mt-3">
//               <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
//                 <div className="flex flex-row justify-between">
//                   <h2 className="text-xl font-bold text-gray-700 mb-6">Edit User</h2>
//                 </div>

//                 {/* User Form */}
//                 <form className="space-y-4 mb-6">
//                   <div className="flex gap-4">
//                     <div className="flex flex-col w-1/2">
//                       <label htmlFor="name" className="text-gray-700 font-semibold">User Name</label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={user.name}
//                         onChange={(e) => setUser({ ...user, name: e.target.value })}
//                         placeholder="Enter username"
//                         className="border border-gray-300 rounded-md p-2"
//                       />
//                     </div>
//                     <div className="flex flex-col w-1/2">
//                       <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={user.email}
//                         onChange={(e) => setUser({ ...user, email: e.target.value })}
//                         placeholder="Enter email"
//                         className="border border-gray-300 rounded-md p-2"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex gap-4">
//                     <div className="flex flex-col w-1/2">
//                       <label htmlFor="about" className="text-gray-700 font-semibold">About</label>
//                       <input
//                         type="text"
//                         id="about"
//                         name="about"
//                         value={user.about}
//                         onChange={(e) => setUser({ ...user, about: e.target.value })}
//                         placeholder="Enter about"
//                         className="border border-gray-300 rounded-md p-2"
//                       />
//                     </div>
//                     <div className="flex flex-col w-1/2">
//                       <label htmlFor="status" className="text-gray-700 font-semibold">Status</label>
//                       <select
//                         id="status"
//                         name="status"
//                         value={user.status}
//                         onChange={(e) => setUser({ ...user, status: e.target.value })}
//                         className="border border-gray-300 rounded-md p-2"
//                       >
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="flex gap-4">
//                     <div className="flex flex-col w-1/2">
//                       <label htmlFor="phone" className="text-gray-700 font-semibold">Phone</label>
//                       <input
//                         type="text"
//                         id="phone"
//                         name="phone"
//                         value={user.phone}
//                         onChange={(e) => setUser({ ...user, phone: e.target.value })}
//                         placeholder="Enter phone number"
//                         className="border border-gray-300 rounded-md p-2"
//                       />
//                     </div>
//                   </div>

//                   {/* Role Dropdown */}
//                   <div className="flex flex-col w-1/2">
//                     <label htmlFor="role" className="text-gray-700 font-semibold">Role</label>
//                     <select
//                       id="role"
//                       name="role"
//                       value={user.role}
//                       onChange={(e) => setUser({ ...user, role: e.target.value })}
//                       className="border border-gray-300 rounded-md p-2"
//                     >
//                       <option value="USER">USER</option>
//                       <option value="ADMIN">ADMIN</option>
//                       <option value="DRIVER">DRIVER</option>
//                     </select>
//                   </div>

//                   {/* Image Upload */}
//                   <div className="flex flex-col w-1/2">
//                     <label htmlFor="image" className="text-gray-700 font-semibold">Profile Image</label>
//                     <input
//                       type="file"
//                       id="image"
//                       name="image"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="border border-gray-300 rounded-md p-2"
//                     />
//                     {imagePreview && (
//                       <img src={imagePreview} alt="Image Preview" className="mt-4 w-32 h-32 rounded-full object-cover" />
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <div className="flex justify-end">
//                     <button
//                       onClick={handleUpdateUser}
//                       className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
