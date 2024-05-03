// ChatPage.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
// import {validateToken} from '../authentication/Login';

const OnlineUsersPage =  () => {
  const[onlineUserlist, setOnlineUserList] = useState([]);
  const[offlineUserList, setOfflineUserList] = useState([]);

  useEffect(()=>{
    let timer = setInterval(() => {
      setOnlineUserList(JSON.parse(sessionStorage.getItem('onlineUserList')) || [])
      setOfflineUserList(JSON.parse(sessionStorage.getItem('offlineUserList')) || [])
      
    });
    return () => clearInterval(timer);
  })





  

  return (
      <div>
      <h2>Online Users</h2>
        <ul>
          {onlineUserlist.map((user, index) => (
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
          </div>
     
    
  );
};

export default OnlineUsersPage;
{/* <button></button>
<button onClick></button>
<ChatPage visible={false} ></ChatPage> */}