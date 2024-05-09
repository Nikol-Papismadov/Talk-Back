import React from 'react'
import { useNavigate } from 'react-router-dom';
import './logout.css'

const Logout = () => {

  const handleLogout = async () => {
    
    const data = await fetch('http://localhost:5000/api/auth/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionStorage.getItem('username'))
    });
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    window.location.reload();
  };


  return (
    <div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout