import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

  const handleLogout = () => {
    
    sessionStorage.removeItem('username'); // Clear session storage
    navigate('/login'); // Redirect to the login page
};


  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout