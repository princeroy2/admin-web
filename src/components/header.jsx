import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
const Header = () => {
  const [link, setLink] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Update the link state based on the pathname whenever it changes
  useEffect(() => {
    if (location.pathname === '/') {
      setLink('Dashboard');
    } else {
      setLink(location.pathname.slice(1)); // Remove the leading '/'
    }
  }, [location.pathname]); // Dependency array ensures it runs when pathname changes

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('accessToken');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <FontAwesomeIcon icon={faHome} className="text-xl text-white mr-3 w-8" />
        <h1 className="text-white font-bold">/{link}</h1>
      </div>

      <div>
        <FontAwesomeIcon icon={faUser} className="text-xl text-white mr-3 w-8" />
        <FontAwesomeIcon icon={faBell} className="text-xl text-white mr-3 w-8" />
        <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout} className="text-xl text-white mr-3 w-8 cursor-pointer" />
      </div>
      
    </div>
  );
};

export default Header;
