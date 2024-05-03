import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './componenets/authentication/Login'
import Register from './componenets/authentication/Register';
import Home from './Home';
import {useRecoilState} from 'recoil';


function App() {
  const user = sessionStorage.getItem("username");
    
  
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route  path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={user? <Home /> : <Login />} />
          {/* <Route path="/chat" element={<ChatPage />} />
          <Route path="/onlineUsers" element={<OnlineUsersPage />} /> */}
        </Routes>
      </div>
    </Router>

    {/* <OnlineUsersPage username={username}/> 
    <ChatPage visible={false}/> */}
    </>
  );
}

export default App;
