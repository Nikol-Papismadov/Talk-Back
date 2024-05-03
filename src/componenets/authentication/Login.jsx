// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedIn } from '../game/services/Recoil';
//import jwt from 'jsonwebtoken';

function Login({ lastLoggedInUsername }) {
  const navigate=useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(isLoggedIn);
  const [formData, setFormData] = useState({
    username: lastLoggedInUsername ||'',
    password: '',
  });
  

  const validateToken = async (username, accessToken, refreshToken) => {
    debugger
    const isTokenvalid = await fetch('http://localhost:5000/api/auth/validateToken/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: accessToken})
    });
    if (isTokenvalid) return isTokenvalid
    const onlineUsers = await getOnlineUsers()
    const response = await fetch('http://localhost:5000/api/auth/refreshToken/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({tusername: username, token: refreshToken, users: onlineUsers})
  });
  return response.body;
}
  const getOnlineUsers = async () => {
    const onlineUsers = await fetch('http://localhost:3001/online-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    });
    return onlineUsers.json();
  }
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      debugger;
      const response = await fetch('http://localhost:5000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('login failed');
      }
      
      const data = await response.json();
      console.log(data);
      
      sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      sessionStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
      sessionStorage.setItem("username", formData.username);
      navigate('/home');
      window.location.reload();
    } 
    catch (error) {
      console.error('Error logging in user:', error);
      alert('Login failed. Please try again.');
    }
  };
  
  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Login</button>
      </form>
      <div>Create new account</div>
      <button>
        <Link to="/register">Register</Link>
      </button>
     
    </div>
  );
}

export default Login;
