import React, { useState } from 'react';
import Game from './componenets/game/Game';
import OnlineUsers from './componenets/onlineUsers/OnlineUsers';
import Navigation from './componenets/layout/Navigation';

const Home = () => {
  const user = sessionStorage.getItem("username");
  return (
    <div>
      <Navigation></Navigation>
      <OnlineUsers/>
    </div>
  );
};

export default Home;
