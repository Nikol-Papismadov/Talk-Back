// ChatPage.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';


const OnlineUsersPage = ({username}) => {
  const navigate = useNavigate();
  
  const [socket, setSocket] = useState(null);
  const [onlineUserList, setOnlineUserList] = useState([]);
  const [offlineUserList, setofflineUserList] = useState([]);
  
  
  
  
  // const location = useLocation();
  // const username = localStorage.getItem('username');
  // const { username} = location.state;

  useEffect(() => {
    // Establishing connection to the server
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);
    // Clean up function
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      // Joining the chat room
      socket.emit('join', username);
    }
  }, [socket, username]);

  useEffect(() => {
    if (socket) {
      // Listening for incoming messages from the server
      socket.on('activeUsers', (onlineUserList) => {
        setOnlineUserList(onlineUserList);
      });

      
      socket.on('offlineUsers', (offlineUserList) => {
        setofflineUserList(offlineUserList);
      });
    }
  }, [socket]);

   

  return (
    
      <div>
        {/* <NavLink to="/onlineUsers">Online Users</NavLink> */}
      <h2>Online Users</h2>
        <ul>
          {onlineUserList.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
          </ul>
        <div>
        <h2>offline Users</h2>
        <ul>
          {offlineUserList.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
          </ul>
        </div>
      <div>
      <button>
        <link to="/chat">Chat</link>
      </button>
      </div>
          </div>
     
    
  );
};

export default OnlineUsersPage;
