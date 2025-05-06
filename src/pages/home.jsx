import React, { useState } from 'react';
// import Chart from './components/chart'; // Adjust path if necessary
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook from react-router-dom
import Sidebar from '../components/sidebar';
import Card from '../components/card';
import Header from '../components/header';
import AdminVehicleChart from '../components/graph';

function Home() {
  // State to track active menu item
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle menu item click
 



  return (
    <div>
      <div className="bg-[rgb(17,205,239)] h-[60vh]">
        {/* Main grid layout with sidebar and content area */}
        <div className="grid grid-cols-[300px_1fr] gap-4">
          {/* Sidebar Section */}
          <Sidebar link='dashboard'/>

          {/* Main Content Section */}
          <div className="p-5 m-3">
           <Header/>

            {/* 4 Small Cards in Grid Layout */}
        <Card/>

            <div className="flex flex-row gap-10">
    
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
