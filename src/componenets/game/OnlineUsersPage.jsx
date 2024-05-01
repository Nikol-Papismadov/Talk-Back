// ChatPage.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';


const OnlineUsersPage = () => {
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [userList, setUserList] = useState([]);



  const location = useLocation();
  const { username} = location.state;

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
    

      socket.on('activeUsers', (userList) => {
        setUserList(userList);

      });
  
    }
  }, [socket]);

  const handleNavigateToChat = () => {
    navigate('/chat', { state: { username } });
  };  

  return (
    
      <div>
        {/* <NavLink to="/onlineUsers">Online Users</NavLink> */}
      <h2>Online Users</h2>
        <ul>
          {userList.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
          </ul>
        
      <div>
      <button onClick={handleNavigateToChat}>
        Chat
      </button>
      </div>
          </div>
     
    
  );
};

export default OnlineUsersPage;
