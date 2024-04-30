// ChatPage.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [userActivity, setUserActivity] = useState([]);
  const [userList, setUserList] = useState([]);

  const location = useLocation();
  const { username } = location.state;

  useEffect(() => {
    // Establishing connection to the server
    const newSocket = io('http://localhost:3000');
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
      // Listening for user activity events
      socket.on('userJoined', ({ username }) => {
        // setUserLogin(`${username} joined the chat`);
        setUserActivity((prevUsers) => [...prevUsers, (username)]);
      });
      socket.on('userLeft', ({ username }) => {
        setUserActivity((prevUsers) => [...prevUsers, (username)]);
      });
    }
  }, [socket]);

  const handleMessageSend = () => {
    if (inputMessage.trim() !== '') {
      // Emitting a message to the server
      socket.emit('ChatMessage',inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div>
{/* Displaying users who joined and left */}
<div>
        {userActivity.map((user, index) => (
          <div key={index}>{user}</div>
        ))}
      </div>
     
      <div>
      {messages.map((msg, index) => (
    <div key={index}>
      <span style={{ fontWeight: 'bold' }}>{msg.username}: </span>
      {msg.message}
    </div>
        ))}
               
      </div>
      <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
      <button onClick={handleMessageSend}>Send</button>
      <p>Logged in as: {username}</p>
     
    </div>
  );
};

export default ChatPage;
