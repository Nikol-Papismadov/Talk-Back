import React, { useState } from 'react';
import Logout from './componenets/authentication/Logout'
import OnlineUsers from './componenets/onlineUsers/OnlineUsers';
import Navigation from './componenets/layout/Navigation';

const Home = () => {
  const user = sessionStorage.getItem("username");
  return (
    <div>
      <Navigation></Navigation>
      <OnlineUsers/>
      <Logout></Logout>
    </div>
  );
};

export default Home;
