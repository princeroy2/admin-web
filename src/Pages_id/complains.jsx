
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Card from '../components/card';
import { useParams } from 'react-router-dom';

function Complainsid() {
  const [activeMenu, setActiveMenu] = useState('users');
  const [user, setUser] = useState([]);

    const { id } = useParams();
    console.log('complainid',id)
  
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const response = await fetch(`http://192.168.1.7:1234/users/oneUser/${id}`);
        const data = await response.json();
        console.log('complain',data)
        setUser(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);




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
                
                </div>

                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">phone</th>
                      <th className="px-4 py-2 text-left">email</th>
                   
                    </tr>
                  </thead>
                  <tbody>
                   
                      <tr >
                      
                      <td className="px-4 py-2">
                          <div className="flex items-center gap-4">
                            <img
                              className="w-12 h-12 rounded-full object-cover"
                              src={user.avatar || "profile.png"}
                              alt="User Avatar"
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
                        <td className="px-4 py-2">{user.phone}</td>
                        <td className="px-4 py-2">{user.email}</td>
                     
                      </tr>
                 
                  </tbody>
                </table>

                {/* Pagination Controls */}
             

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complainsid;
