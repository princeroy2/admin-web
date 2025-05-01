import React, { useEffect, useState } from 'react';
import fetchUsers from '../apis/api_1st';
import { fetchdriver ,fetchadmin,fetchvehical} from '../apis/api_1st';
const Card = () => {
  const [data, setData] = useState(null);
  const [userr, setUser] = useState(null);
  const [driver, setDriver] = useState(null);
  const [Admin, setAdmin] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsers();
     setUser(users.length)
     const driver = await fetchdriver();
     setDriver(driver.length)
     const admin = await fetchadmin();
     setAdmin(admin)
     const vehicle = await fetchvehical();
     setVehicle(vehicle.totalCount)

      

       
    };
    fetchData();
  }, []);  // Empty dependency array ensures this runs once on mount


  return (
    <div className="grid grid-cols-4 gap-10 mt-3">
      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 h-20 items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-600">Total Admin</h2>
          <p className="text-gray-500 font-bold text-[20px]">{Admin}</p>
        </div>
        <div className="w-15 h-15 bg-[#1171EF] text-center rounded-full flex justify-center items-center">
          <img src="/admin.png" alt="Card 3" className="object-cover w-10 h-10 rounded-full" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 h-20 items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-600">Total Driver</h2>
          <p className="text-gray-500 font-bold text-[20px]">{driver}</p>
        </div>
        <div className="w-15 h-15 bg-red-500 text-center rounded-full flex justify-center items-center">
          <img src="/driver.png" alt="Card 3" className="object-cover w-10 h-10 rounded-full" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 h-20 items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-600">Total Users</h2>
          <p className="text-gray-500 font-bold text-[20px]">{userr}</p>
        </div>
        <div className="w-15 h-15 bg-green-500 text-center rounded-full flex justify-center items-center">
          <img src="/users.png" alt="Card 3" className="object-cover w-10 h-10 rounded-full" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg flex gap-5 h-20 items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-600">Total Vehical</h2>
          <p className="text-gray-500 font-bold text-[20px]">{vehicle}</p>
        </div>
        <div className="w-15 h-15 bg-orange-500 text-center rounded-full flex justify-center items-center">
          <img src="/truck.png" alt="Card 3" className="object-cover w-10 h-10 rounded-full" />
        </div>
      </div>



    


     

    
    </div>
  );
};

export default Card;
