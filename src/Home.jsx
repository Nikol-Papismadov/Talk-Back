import React, { useState } from 'react';
import Game from './componenets/game/Game';
import Logout from './componenets/authentication/Logout';
import OnlineUsers from './componenets/onlineUsers/OnlineUsers';

const Home = () => {
  const user = sessionStorage.getItem("username");
  return (
    <div>
      <p>Logged in as: {user}</p>
      <Game></Game> 
      <OnlineUsers/>
      <Logout></Logout>
    </div>
  );
};

export default Home;
