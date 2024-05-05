import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link, json } from 'react-router-dom';


const Chat = ({user}) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userActivity, setUserActivity] = useState([]);
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
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages ,message]);
      });
      setUserActivity((prevUsers) => [...prevUsers, (`${username} joined the chat`)]);
      setUserActivity((prevUsers) => [...prevUsers, (`${username} left the chat`)]);

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
    user ?
    <div>
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
    : <></>
  )
}

export default Chat