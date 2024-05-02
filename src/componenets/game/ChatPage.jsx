// ChatPage.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';



const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userActivity, setUserActivity] = useState([]);
  const [userList, setUserList] = useState([]);


  const username = sessionStorage.getItem('username');


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
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages ,message]);
      });

      // Listening for user activity events
      socket.on('userJoined', ({ username }) => {
        // setUserLogin(`${username} joined the chat`);
        setUserActivity((prevUsers) => [...prevUsers, (`${username} joined the chat`)]);
      });

      socket.on('userLeft', ({ username }) => {
        setUserActivity((prevUsers) => [...prevUsers, (`${username} left the chat`)]);

      });

      socket.on('activeUsers', (userList) => {
        setUserList(userList);

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

     
      <div>
        {/* <NavLink to="/onlineUsers">Online Users</NavLink> */}
      <h2>Online Users</h2>
        <ul>
          {userList.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
          </ul>
        
          </div>
          <div>
            <button>
              <Link to="/onlineUsers">Online Users</Link>
            </button>
          </div>
      
     
    </div>
  );
};

export default ChatPage;
