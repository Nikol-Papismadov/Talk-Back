import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./chat.css";
import ValidateToken from "../authentication/ValidateToken";

const Chat = ({ visibility, sender, receiver }) => {
  const [socket, setSocket] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [history, setHistory] = useState([]);

  const privateRoomString = () => {
    const concatenatedString = sender + receiver;
    const lowercaseString = concatenatedString.toLowerCase();
    const sortedString = lowercaseString.split("").sort().join("");
    return sortedString;
  };
  const room = privateRoomString();

  useEffect(() => {
    ValidateToken();
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("join", room, sender);
    }
  }, [socket, room]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (sender, message) => {
        setHistory((prevHistory) => [...prevHistory, `${sender}: ${message}`]);
      });
      socket.on("pendingMessage", (sender) => {
        alert(`${sender} sent you a new message`);
      });

      // socket.on('userJoined', ( username ) => {
      //     setHistory((prevHistory) => [...prevHistory, (`${username} joined the chat`)]);
      // });

      // socket.on('userLeft', ( username ) => {
      //     setHistory((prevHistory) => [...prevHistory, (`${username} left the chat`)]);
      // });
    }
  }, [socket, room]);

  const handleMessageSend = () => {
    if (inputMessage.trim() !== "") {
      debugger;
      socket.emit("chatMessage", {
        room,
        sender,
        receiver,
        message: inputMessage,
      });
      setInputMessage("");
    }
  };
  return visibility ? (
    <div>
      <div className="receiver-header">{receiver}</div>
      <div className="chat">
        {history.map((event, index) => (
          <p key={index}>{event}</p>
        ))}
        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={handleMessageSend}>Send</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Chat;
