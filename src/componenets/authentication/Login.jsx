// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedIn } from '../../services/Recoil';

function Login({ lastLoggedInUsername }) {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(isLoggedIn);
  const [formData, setFormData] = useState({
    username: lastLoggedInUsername || '',
    password: '',
  });

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

      const { username } = formData;

      setIsUserLoggedIn(true);
      localStorage.setItem('lastLoggedInUsername', username);

      navigate('/chat', { state: { username } }); // Redirect to chat page with username

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
