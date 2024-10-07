//this component is just for testing purpuses

import React, { useEffect, useState } from 'react';

const UsingTokenExample = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('admin_token');
  const baseUrl = 'https://tproject.techpundits.net';
  const endpoint = '/api/admin/me';

  useEffect(() => {
    const fetchAdminInfo = async () => {
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }

      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdminInfo(data);
        } else if (response.status === 401) {
          setError('Unauthorized: Invalid or missing token.');
        } else {
          setError('An error occurred while fetching admin information.');
        }
      } catch (err) {
        setError('Network error: ' + err.message);
      }
    };

    fetchAdminInfo();
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!adminInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>see the code of this component UsingTokenExample.js" to learn how to use the login token in your component 
       
       </div>
       <div>for example here im using the token obtained form AdminLogin.js component to get the admin info form the backend       </div>
    <hr></hr>
       <h2>Admin Information</h2>
      <pre>{JSON.stringify(adminInfo, null, 2)}</pre>
    </div>
  );
};

export default UsingTokenExample;
