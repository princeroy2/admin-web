import axios from 'axios';

    // Fetch users from the API
 const fetchUsers = async () => {
        try {
          const response = await fetch('http://192.168.1.7:1234/users/allUsers');
          const data = await response.json();
          console.log(data)
          
          // Filter users with role 'USER'
          const filteredUsers = data.data.filter(user => user.role === 'USER');
          
         return filteredUsers
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
export default fetchUsers


const fetchdriver = async () => {
    try {
      const response = await fetch('http://192.168.1.7:1234/users/allUsers');
      const data = await response.json();
      const filteredUsers = data.data.filter(user => user.role === 'DRIVER' && user.status === 'active');
     return filteredUsers
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
export  {fetchdriver}



const fetchadmin = async () => {
    try {
      const response = await fetch('http://192.168.1.7:1234/users/allUsers');
      const data = await response.json();
      console.log(data)
      
      // Filter users with role 'USER'
      const filteredUsers = data.data.filter(user => user.role === 'ADMIN');
      
     return filteredUsers.length
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
export  {fetchadmin}

const fetchoneuser = async (id) => {
  try {
    const response = await fetch(`http://192.168.1.7:1234/users/oneUser/${id}`);
    const data = await response.json();

    return data; // return the actual user object (e.g. { name, email, role, ... })
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export { fetchoneuser };




const fetchdriverone = async (id) => {
  try {
    const response = await fetch(`http://192.168.1.7:1234/users/oneUser/${id}`);
    const data = await response.json();

    return data; // return the actual user object (e.g. { name, email, role, ... })
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export { fetchdriverone };

const fetchonevehicle = async (id) => {
  try {
    const response = await fetch(`http://192.168.1.7:1234/vehicle/specific/${id}`);
    const data = await response.json();

    return data; // return the actual user object (e.g. { name, email, role, ... })
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export { fetchonevehicle };


const fetchvehical = async () => {
    try {
      const response = await fetch('http://192.168.1.7:1234/vehicle');
      const data = await response.json();
      console.log(data)
      
     return data
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
export  {fetchvehical}



const userpatch = async (userData) => {
  const token = localStorage.getItem('accessToken'); // Replace with your actual token retrieval method
  console.log('tokeeeeeeeeeeeeeen',token)
  try {
    const response = await fetch(`http://192.168.1.7:1234/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Pass the token here, not the ID
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    console.log('API response:', data);
    return data
   
  } catch (err) {
    console.error('API error:', err);
  } finally {
  //   setLoading(false);
  }
}

export {userpatch}



const patchvehicle = async (id,form,token) => {
  try {
    const response = await fetch(`http://192.168.1.7:1234/vehicle/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set 'Content-Type' header, the browser will automatically handle it for FormData
      },
      body: form
    });
  
    const data = await response.json();
    console.log('API response:', data);
  return data
  } catch (err) {
   return err
  } finally {
  }
};
export  {patchvehicle}
