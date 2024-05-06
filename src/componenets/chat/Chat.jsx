import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = ({sender, receiver}) => {
    const [socket, setSocket] = useState(null);
    const [inputMessage, setInputMessage] = useState('');
    const [history, setHistory] = useState([]);

    const privateRoomString = () =>{
        const concatenatedString = sender + receiver;
        const lowercaseString = concatenatedString.toLowerCase();
        const sortedString = lowercaseString.split('').sort().join('');
        return sortedString;
    }
    const room = privateRoomString();

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        return () => newSocket.close();
    },[]);

    useEffect(() => {
        if (socket) {
          socket.emit('join', room, sender);
        }
    }, [socket, room]);

    useEffect(() => {
        debugger;
        if (socket) {
            socket.on('message', (sender, message) => {
                setHistory((prevHistory) => [...prevHistory ,(`${sender}: ${message}`)]);
            });

            socket.on('userJoined', ( username ) => {
                setHistory((prevHistory) => [...prevHistory, (`${username} joined the chat`)]);
            });
            
            socket.on('userLeft', ( username ) => {
                setHistory((prevHistory) => [...prevHistory, (`${username} left the chat`)]);
            });
        }
    }, [socket, room]);

    const handleMessageSend = () => {
        if (inputMessage.trim() !== '') {
            debugger
          socket.emit('chatMessage',{room, sender, message: inputMessage});
          setInputMessage('');
        }
      };
  return (
    <div>
        {history.map((event, index) => (
            <p key={index}>{event}</p>
        ))}
        <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
        <button onClick={handleMessageSend}>Send</button>
    </div>
  )
}

export default Chat