import React, { useState } from 'react';
import Login from './authentication/Login';
import Chat from './game/ChatPage';

const Home = () => {
  const [username, setUsername] = useState('');

  // Function to handle successful login
  const handleLoginSuccess = (username) => {
    setUsername(username);
  };

  return (
    <div>
      {username ? (
        <Chat username={username} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Home;
