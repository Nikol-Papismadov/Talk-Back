import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "../chat/Chat";
import Game from "../game/Game";
import "./onlineUsers.css";
import ValidateToken from "../authentication/ValidateToken";

const OnlineUsers = () => {
  const [socket, setSocket] = useState(null);
  const [gameSocket, setGameSocket] = useState({});
  const [inGame, setInGame] = useState(false); // State to track whether the user is in a game


  const username = sessionStorage.getItem("username");
  const [opponent, setOpponent] = useState(null);

  const [onlineUserlist, setOnlineUserList] = useState([]);
  const [offlineUserList, setOfflineUserList] = useState([]);

  const [visibleChat, setVisibleChat] = useState({});
  const [receiver, setReceiver] = useState(false);

  useEffect(() => {
    ValidateToken();
    const newSocket = io("http://localhost:3002");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const handleNewGame = (user) => {
      setInGame(true);

      const newGameSocket = io("http://localhost:3001");
      setGameSocket((prevState) => ({
        ...prevState,
        [user]: newGameSocket,
      }));
      setOpponent(user);
    
  };

  useEffect(() => {
   
    if (gameSocket[opponent] && opponent && socket) {
      if (!receiver) {
        socket.emit("sentGameRequest", { sender: username, opponent });
      }
    }
  
  }, [gameSocket, opponent]);
  useEffect(() => {
    if (socket) {
      socket.on("updateActiveUsers", (userList) => {
        const visibilityObj = {};
        userList.forEach((user) => {
          visibilityObj[user] = false;
        });
        setVisibleChat(visibilityObj);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("join", username);
    }
  }, [socket, username]);

  useEffect(() => {
    if (socket) {
      socket.on("UserJoined", (username) => {
        alert(`${username} is now online`);
      });

      socket.on("UserLeft", (username) => {
        setInGame(false);
        alert(`${username} is now offline`);
        

      });
      socket.on("updateActiveUsers", (userList) => {
       
        setOnlineUserList(userList);
        sessionStorage.setItem("onlineUserList", JSON.stringify(userList));
      });
      socket.on("updateOfflineUsers", (userList) => {
        setOfflineUserList(userList);
        sessionStorage.setItem("offlineUserList", JSON.stringify(userList));
      });
      socket.on("gameRequest", (sender) => {
        alert(`${sender} sent you a game request`);
        setReceiver(true);
      });
    }
  }, [socket]);

  const handleOpenChat = (user) => {
    setVisibleChat((prevState) => ({
      ...prevState,
      [user]: !prevState[user],
    }));
  };

  return (
    <div className="left-panel">
      <div>
        <h2>Online Users</h2>
        <ul>
          {onlineUserlist
            .filter((user) => user !== username)
            .map((user, index) => (
              <li key={index}>
                {user}
                <button onClick={() => handleOpenChat(user)}>Chat</button>
                <button
                  onClick={() => handleNewGame(user)}
                  disabled={inGame} >
                  New Game
                </button>
                <div className="chat-panel">
                  <Chat
                    className="chat-panel"
                    visibility={visibleChat[user]}
                    sender={username}
                    receiver={user}
                  ></Chat>
                </div>
                {gameSocket[user] ? (
                  <div className="game-panel">
                    <Game
                      socket={gameSocket[user]}
                      user={username}
                      opponent={user}
                    ></Game>
                  </div>
                ) : null}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h2>Offline Users</h2>
        <ul>
          {offlineUserList
            .filter((user) => user !== "")
            .map((user, index) => (
              <li key={index}>{user}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default OnlineUsers;
