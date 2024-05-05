import React, { useState } from 'react';
import ChatPage from './componenets/chat/ChatPage';
import OnlineUsersPage from './componenets/chat/OnlineUsersPage';
import Game from './componenets/game/Game';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './componenets/authentication/Logout';
import OnlineUsers from './componenets/onlineUsers/OnlineUsers';

const Home = () => {
  // const navigate = useNavigate();
  
  // const handleLogout = () => {
  //   debugger
  //   sessionStorage.removeItem('username'); // Clear session storage
  //   navigate('/login'); // Redirect to the login page
  //   // window.location.reload();
  // };

  return (
    <div>
      <Game></Game> 
      <OnlineUsers/>
      {/* <OnlineUsersPage></OnlineUsersPage>
      <ChatPage></ChatPage>  */}
      <Logout></Logout>
    </div>
  );
};

export default Home;
