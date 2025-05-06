import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/card';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

function Adminaddd  () {
  const [activeMenu, setActiveMenu] = useState('users');
  const [apierror, setApierror] = useState('');
  const [customerror, setCustomerror] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN',
    about: '',
    status: 'active',
    phone: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,  // Update the corresponding field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (formData.name.length < 3 || formData.name.length > 25) {
      setCustomerror('Name must be between 3 and 25 characters.');
      return;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setCustomerror('Please enter a valid email.');
      return;
    }

    if (formData.password.length < 5) {
      setCustomerror('Password must be at least 5 characters long.');
      return;
    }

    // Prepare the signup data
    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      about: formData.about,
      status: formData.status,
      phone: formData.phone,
    };

    // Submit the form data
    try {
      const response = await fetch('http://192.168.1.5:1234/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        const message = await response.json();
        console.error('Error message from API:', message.message);
        setApierror(message.message);
      }

      const result = await response.json();
      console.log('API Result:', result);

      if (result) {
        navigate('/Admin');  // Navigate to /users after success
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div>
      <div className="bg-[rgb(17,205,239)] h-[60vh]">
        <div className="grid grid-cols-[300px_1fr] gap-4">
          <Sidebar/>
          <div className="p-5 m-3">
            <Header/>
            <Card/>
            <div className="grid grid-cols gap-10 mt-3">
              <div className="mt-8 w-full bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-row justify-between">
                  <h2 className="text-xl font-bold text-gray-700 mb-6">Users</h2>
                  <h2
                    className="text-md font-bold text-gray-700 hover:cursor-pointer hover:text-gray-500 bg-green-400 flex items-center px-3 h-10"
                    onClick={() => {
                      navigate('/users/add');
                    }}
                  >
                    Add User
                  </h2>
                </div>

                <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="name" className="text-gray-700 font-semibold">User Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="password" className="text-gray-700 font-semibold">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="role" className="text-gray-700 font-semibold">Role</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      >
                        <option value="ADMIN">ADMIN</option>
                      
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="about" className="text-gray-700 font-semibold">About</label>
                      <input
                        type="text"
                        id="about"
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        placeholder="Enter about"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="status" className="text-gray-700 font-semibold">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
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
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  {apierror && (
                    <div className="text-red-500 bg-red-100 p-3 rounded mt-4">{apierror}</div>
                  )}
                   {customerror && (
                    <div className="text-red-500 bg-red-100 p-3 rounded mt-4">{customerror}</div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
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

export default Adminaddd;
