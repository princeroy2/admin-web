
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Card from '../components/card';

function Complainuser() {
  const [activeMenu, setActiveMenu] = useState('users');
  const [complain, setComplain] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://192.168.1.7:1234/Complaint');
        const data = await response.json();
       console.log(data)
        setComplain(data.data);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = complain.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(complain.length / usersPerPage);

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

                <div className="overflow-x-auto">
  <table className="min-w-full table-auto">
    <thead>
      <tr>
        <th className="px-4 py-2 text-left">Description</th>
        <th className="px-4 py-2 text-left">Reason</th>
        <th className="px-4 py-2 text-left">Date</th>
        <th className="px-4 py-2 text-left">See</th>
      </tr>
    </thead>
    <tbody>
      {currentUsers.map((user, index) => (
        <tr key={index}>
          <td className="px-4 py-2 max-w-sm break-words whitespace-pre-wrap">
            <p className="text-gray-800">{user.description}</p>
          </td>
          <td className="px-4 py-2">{user.reasons[0]}</td>
          <td className="px-4 py-2">{new Date(user.createdAt).toLocaleString()}</td>
          <td className="px-4 py-2">
            <button
              className="text-green-500 hover:underline"
              onClick={() => navigate(`/complains/${user.userId}`)}
            >
              See Details
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


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

export default Complainuser;
