import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from '../chat/Chat';
import Game from '../game/Game'

const OnlineUsers = () => {
  const [socket, setSocket] = useState(null);
  const [gameSocket, setGameSocket] = useState(null);

  const username = sessionStorage.getItem('username');
  const [opponent, setOpponent] = useState(null)
  
  const[onlineUserlist, setOnlineUserList] = useState([]);
  const[offlineUserList, setOfflineUserList] = useState([]);
  
  const [visibleChat, setVisibleChat] = useState({});

  const handleNewGame = (user) => {
    debugger
    if(gameSocket){
      alert('Must leave previous game')
      return;
    }
    else{
        const newGameSocket = io('http://localhost:3001');
        setGameSocket(newGameSocket);
        setOpponent(user)
    }};
``

    useEffect(() => {
      debugger
      if (gameSocket && opponent && socket) {
        socket.emit('sentGameRequest', {sender:username, opponent})
    }
    },[gameSocket, opponent])
    useEffect(() => {
      if (socket) {
        socket.on('updateActiveUsers', (userList) => {
          const visibilityObj = {};
          userList.forEach(user => {
            visibilityObj[user] = false;
          });
          setVisibleChat(visibilityObj);
        });
      }
    }, [socket]);

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
        socket.on('UserJoined', (username) => {
          alert(`${username} is now online`);
        })

        socket.on('UserLeft', (username) => {
          alert(`${username} is now offline`);
        })
        socket.on('updateActiveUsers', (userList) => {
          setOnlineUserList(userList);
          sessionStorage.setItem('onlineUserList', JSON.stringify(userList));
          
        });
        socket.on('updateOfflineUsers', (userList) => {
          setOfflineUserList(userList);
          sessionStorage.setItem('offlineUserList', JSON.stringify(userList));
        });
        socket.on('gameRequest', (sender)=>{
          alert(`${sender} sent you a game request`)
        })
      }
    }, [socket]);
    
    const handleOpenChat = (user) => {
      setVisibleChat(prevState => ({
        ...prevState,
        [user]: !prevState[user]
      })
    );
    };


  return (
    <div>
        <div>
            <h2>Online Users</h2>
            <ul>
                  {onlineUserlist.filter(user => user !== username).map((user, index) => (
                    
                    <li key={index}>
                      {user}
                      <button onClick={() => handleOpenChat(user)}>Chat</button>
                      <Chat visibility={visibleChat[user]} sender={username} receiver={user}></Chat>
                      <button onClick={() => handleNewGame(user)}>New Game</button>
                      {gameSocket ? <Game socket={gameSocket} user={username} opponent={user}></Game> : null}
                    </li>
                ))}
            </ul>
        </div>
        <div>
           <h2>Offline Users</h2>
           <ul>
                {offlineUserList.filter(user => user !== '').map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
          </ul>
        </div>
      </div>
  )
}

export default OnlineUsers

