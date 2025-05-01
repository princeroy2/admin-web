import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditUser from './Pages_id/useredit';
import Login from './pages/login';
import './App.css';
import Users from './pages/users';
import Home from './pages/home';
import Vehicle from './pages/vehicle';
import Booking from './pages/booking';
import UserAdd from './Pages_id/useradd';
import VehicleAdd from './Pages_id/vehicleadd';
import Vedit from './Pages_id/vehicleEdit.jsx';
import BookingEdit from './Pages_id/bookingedit.jsx';
import Driver from './pages/driver.jsx';
import Admin from './pages/admin.jsx';
import ProtectedRoute from './protectroute.js'; // Import the ProtectedRoute component
import Driveraddd from './Pages_id/driveradd.jsx';
import Adminaddd from './Pages_id/adminadd.jsx';
import Adminedit from './Pages_id/addminedit.jsx';
import Maps from './pages/map.jsx';
import Complainuser from './pages/complain.jsx';
import Complainsid from './Pages_id/complains.jsx';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Public Route */}

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/vehicle" element={<ProtectedRoute element={<Vehicle />} />} />
        <Route path="/booking" element={<ProtectedRoute element={<Booking />} />} />
        <Route path="/user" element={<ProtectedRoute element={<Users />} />} />
        <Route path="/Driver" element={<ProtectedRoute element={<Driver />} />} />
        <Route path="/Admin" element={<ProtectedRoute element={<Admin />} />} />
        <Route path="/complains" element={<ProtectedRoute element={<Complainuser />} />} />

        {/* Protected Add and Edit Routes */}
        <Route path="/user/add" element={<ProtectedRoute element={<UserAdd />} />} />

        <Route path="/Driver/add" element={<ProtectedRoute element={<Driveraddd />} />} />
        <Route path="/Admin/add" element={<ProtectedRoute element={<Adminaddd />} />} />
        <Route path="/user/edit/:id" element={<ProtectedRoute element={<EditUser />} />} />
        <Route path="/Admin/edit/:id" element={<ProtectedRoute element={<Adminedit />} />} />
        <Route path="/track/:id" element={<ProtectedRoute element={<Maps />} />} />
        <Route path="/complains/:id" element={<ProtectedRoute element={<Complainsid />} />} />
        


        <Route path="/vehicle/add" element={<ProtectedRoute element={<VehicleAdd />} />} />
        <Route path="/vehicle/edit/:id" element={<ProtectedRoute element={<Vedit />} />} />
        <Route path="/booking/edit/:id" element={<ProtectedRoute element={<BookingEdit />} />} />
      </Routes>
    </Router>
  );
};

export default App;
