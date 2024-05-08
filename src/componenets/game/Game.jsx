import React from 'react'
import { useEffect } from 'react';

const Game = ({socket, user, opponent}) => {

    const privateRoomString = () =>{
        const concatenatedString = user + opponent;
        const lowercaseString = concatenatedString.toLowerCase();
        const sortedString = lowercaseString.split('').sort().join('');
        return sortedString;
    }
    const room = privateRoomString();

    useEffect(() => {
        if (socket) {
          socket.emit('join', room, user);
        }
    }, [socket, room]);

    useEffect(() => {
        debugger;
        if (socket) {
            socket.on('OpponentGameMove', () => {
            });
            socket.on('userGameMove', () =>{

            })
        }
    }, [socket, room]);

  return (
    <div>
      <button>Leave game</button>
    </div>
  )
}

export default Game