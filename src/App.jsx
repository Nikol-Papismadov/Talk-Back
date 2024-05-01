import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './componenets/authentication/Login'
import Register from './componenets/authentication/Register';
import Home from './Home';
import {useRecoilState} from 'recoil';
import ChatPage from './componenets/game/ChatPage';
import OnlineUsers from './componenets/game/OnlineUsersPage';


function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route  path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/onlineUsers" element={<OnlineUsers />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
