import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Optionally, make a call to the backend to invalidate the session or token.
        await axios.post('http://localhost:5000/api/auth/logout'); // Adjust the endpoint as needed

        // Remove authentication data from localStorage or cookies (depending on your implementation)
        localStorage.removeItem('authToken'); // Assuming the token is stored in localStorage
        sessionStorage.removeItem('authToken'); // If using sessionStorage

        // Redirect the user to the login page after logout
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
