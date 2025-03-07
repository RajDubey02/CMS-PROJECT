import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setRole(null);
    localStorage.removeItem("email");
    setEmail(null);
    navigate("/login");
  };


  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Optionally, make a call to the backend to invalidate the session or token.
        await axios.post('http://localhost:5000/api/auth/logout'); // Adjust the endpoint as needed
        
        // Remove authentication data from localStorage or cookies (depending on your implementation)
        
          localStorage.removeItem("userRole");
          // setRole(null);
          localStorage.removeItem("email");
          // setEmail(null);
          // navigate("/login");
       
        // Redirect the user to the login page after logout
        navigate('/login');
        location.reload()
      } catch (error) {
        console.error('Logout error:', error);
      }
    };
    logoutUser();
  }, [navigate]);
  
  return (
    <div>
      {/* <h2>Logging out...</h2> */}
    </div>
  );
};

export default Logout;
