import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation hook

const Sidebar = ({ link }) => {
  const [activeMenu, setActiveMenu] = useState(link);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation(); // Use the useLocation hook to get the current URL
//    console.log(location)
  // Update active menu whenever the location (URL) changes
  useEffect(() => {
    // Based on the current URL, set the active menu
    if (location.pathname === '/') {
      setActiveMenu('dashboard');
    } else if (location.pathname === '/user' || location.pathname.startsWith('/user/')) {
      setActiveMenu('Users'); // This covers '/user', '/user/add', '/user/edit', etc.
    } else if (location.pathname === '/Driver' || location.pathname.startsWith('/Driver/')) {
      setActiveMenu('Driver'); // This covers '/user', '/user/add', '/user/edit', etc.
    }
    else if (location.pathname === '/Admin' || location.pathname.startsWith('/Admin/')) {
      setActiveMenu('Admin'); // This covers '/user', '/user/add', '/user/edit', etc.
    }
    else if (location.pathname === '/complains' || location.pathname.startsWith('/complains/')) {
      setActiveMenu('complains'); // This covers '/user', '/user/add', '/user/edit', etc.
    }
    else if (location.pathname === '/vehicle' || location.pathname.startsWith('/vehicle/')) {
      setActiveMenu('vehicle'); // This covers '/vehicle', '/vehicle/:id', etc.
    } else if (location.pathname === '/booking' || location.pathname.startsWith('/booking/')) {
      setActiveMenu('booking'); // This covers '/booking', '/booking/:id', etc.
    }
  }, [location]); // This will run whenever the URL changes

  const handleMenuClick = (menu, route) => {
    setActiveMenu(menu);
    navigate(route); // Navigate to the route
  };

  return (
    <div className="bg-white p-6 m-3 rounded-lg shadow-lg h-[90vh] ">
      <h1 className="text-gray-700 text-1xl text-center font-bold mb-6">FMS Truck Admin</h1>
      {/* Sidebar Menu */}
      <div className="space-y-3 ">
        <div
          className={`flex items-center p-3 gap-5 ${activeMenu === 'dashboard' ? 'bg-blue-100' : ''} hover:cursor-pointer`}
          onClick={() => handleMenuClick('dashboard', '/')}
        >
          <img src="/dashbord.png" alt="Dashboard" className="object-cover w-8 h-8 rounded-l-lg" />
          <h2 className="text-gray-700 font-bold">Dashboard</h2>
        </div>

        <div
          className={`flex items-center p-3 gap-5 ${activeMenu === 'Users' ? 'bg-blue-100' : ''} hover:cursor-pointer`}
          onClick={() => handleMenuClick('Users', '/user')}
        >
          <img src="/users.png" alt="Users" className="object-cover w-10 h-10 rounded-l-lg" />
          <h2 className="text-gray-700 font-bold">Users</h2>
        </div>

        <div
          className={`flex items-center p-3 gap-5 ${activeMenu === 'Driver' ? 'bg-blue-100' : ''} hover:cursor-pointer`}
          onClick={() => handleMenuClick('Driver', '/Driver')}
        >
          <img src="/driver.png" alt="Driver" className="object-cover w-8 h-8 rounded-l-lg" />
          <h2 className="text-gray-700 font-bold">Driver</h2>
        </div>


        <div
          className={`flex items-center p-3 gap-5 ${activeMenu === 'Admin' ? 'bg-blue-100' : ''} hover:cursor-pointer`}
          onClick={() => handleMenuClick('Admin', '/Admin')}
        >
          <img src="/admin.png" alt="Admin" className="object-cover w-8 h-8 rounded-l-lg" />
          <h2 className="text-gray-700 font-bold">Admin</h2>
        </div>
        <div
          className={`flex items-center p-3 gap-5 ${activeMenu === 'vehicle' ? 'bg-blue-100' : ''} hover:cursor-pointer`}
          onClick={() => handleMenuClick('vehicle', '/vehicle')}
        >
          <img src="/truck.png" alt="Vehicle" className="object-cover w-10 h-10 rounded-l-lg" />
          <h2 className="text-gray-700 font-bold">Vehicle</h2>
        </div>

        <div
          className={`flex items-center p-3 gap-5 ${activeMenu === 'booking' ? 'bg-blue-100' : ''} hover:cursor-pointer`}
          onClick={() => handleMenuClick('booking', '/booking')}
        >
          <img src="/booking.png" alt="Booking" className="object-cover w-8 h-8 rounded-l-lg" />
          <h2 className="text-gray-700 font-bold">Booking</h2>
        </div>
        <div
          className={`flex items-center p-3 gap-5 ${activeMenu === 'complains' ? 'bg-blue-100' : ''} hover:cursor-pointer`}
          onClick={() => handleMenuClick('complains', '/complains')}
        >
          <img src="/complaints.png" alt="Booking" className="object-cover w-8 h-8 rounded-l-lg" />
          <h2 className="text-gray-700 font-bold">complaints</h2>
        </div>
       
      </div>
    </div>
  );
};

export default Sidebar;
