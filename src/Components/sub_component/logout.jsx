import React, { useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      logout(); // Call the logout function to clear user data
      localStorage.removeItem('user'); // Remove user data from local storage
    }
    /* window.location.reload() */
    navigate('/login'); // Navigate to the login page
  }, [user, logout, navigate]);

  return <h1>Logging out...</h1>;
}

export default Logout;
