// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedIn } from '../game/services/Recoil';
//import jwt from 'jsonwebtoken';

function Login({ lastLoggedInUsername }) {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(isLoggedIn);
  const [formData, setFormData] = useState({
    username: lastLoggedInUsername || '',
    password: '',
  });

//   const validateToken = async (username, accessToken, refreshToken) => {
    
//     // if (jwt.verify(accessToken)) {
//     //     return true;
//     // }
//     const response = await fetch('http://localhost:5000/api/auth/RefreshToken/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({username: username, token: refreshToken})
//   });
//   return response.data;
// }
  const getOnlineUsers = async () => {
    debugger
    const onlineUsers = await fetch('http://localhost:3000/online-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
    });
    return onlineUsers;
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
      // validateToken(formData.username, data.accessToken, data.refreshToken);
      getOnlineUsers();
      const { username } = formData;

      setIsUserLoggedIn(true);
      localStorage.setItem('lastLoggedInUsername', username);
      // localStorage.setItem('username', username);
      


     navigate('/onlineUsers', { state: { username } }); // Redirect to chat page with username
      // navigate('/chat' );

    } catch (error) {
      console.error('Error logging in user:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div>
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
