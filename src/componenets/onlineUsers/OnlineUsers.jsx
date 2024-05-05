import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from '../chat/Chat';

const OnlineUsers = () => {
    const [socket, setSocket] = useState(null);
    const username = sessionStorage.getItem('username');

    const[onlineUserlist, setOnlineUserList] = useState([]);
    const[offlineUserList, setOfflineUserList] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:3002');
        setSocket(newSocket);

        return () => newSocket.close();
    },[]);

    useEffect(() => {
        if (socket) {
          socket.emit('join', username);
        }
    }, [socket, username]);

    useEffect(() => {
        if (socket) {
          socket.on('updateActiveUsers', (userList) => {
            setOnlineUserList(userList);
            sessionStorage.setItem('onlineUserList', JSON.stringify(userList));
            // setOnlineUserList(JSON.parse(sessionStorage.getItem('onlineUserList')));
          });
          socket.on('updateOfflineUsers', (userList) => {
            setOfflineUserList(userList);
            sessionStorage.setItem('offlineUserList', JSON.stringify(userList));
          });
        }
      }, [socket]);
    

  return (
    <div>
        <div>
            <h2>Online Users</h2>
            <ul>
                {onlineUserlist.map((user, index) => (
                    <li key={index}>
                        {user}
                        <button>Chat</button>
                        <Chat sender={username} reciever={user}></Chat>
                    </li>
                ))}
            </ul>
        </div>
        <div>
           <h2>Offline Users</h2>
           <ul>
                {offlineUserList.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
          </ul>
        </div>
      </div>
  )
}

export default OnlineUsers

