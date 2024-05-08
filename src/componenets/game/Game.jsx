import React from "react";
import { useEffect, useState } from "react";
import "./newGame.css";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  return gameTurns.length % 2 === 0 ? "X" : "O"; // Calculate active player based on number of turns
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { sqaure, player } = turn;
    const { row, col } = sqaure;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSqaureSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSqaureSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSqaureSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSqaureSymbol &&
      firstSqaureSymbol === secondSqaureSymbol &&
      firstSqaureSymbol === thirdSqaureSymbol
    ) {
      winner = players[firstSqaureSymbol];
    }
  }

  return winner;
}

const Game = ({ socket, user, opponent }) => {
  const [gameDisplay,setGameDisplay] = useState(false)
  
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const [activePlayer,setActivePlayer] = useState('X')
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const privateRoomString = () => {
    const concatenatedString = user + opponent;
    const lowercaseString = concatenatedString.toLowerCase();
    const sortedString = lowercaseString.split("").sort().join("");
    return sortedString;
  };
  const room = privateRoomString();

  useEffect(() => {
    if (socket) {
      socket.emit("joinGameRoom", room, user);
    }
  }, [socket, room]);

  useEffect(() => {
    if (socket) {
      socket.on("startGame", () => {  
        setGameDisplay(true)
      });
      socket.on('opponentLeft', (opponent) =>{
        alert(`${opponent} gave up, You win!`);
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
      })
      socket.on("opponentGameMove", ({ row, col, activePlayer}) => {
        console.log(row,col);
        setGameTurns((prevTurns) => {
          setActivePlayer(activePlayer == 'X' ? 'O' : 'X')
          if(prevTurns[0] && prevTurns[0].sqaure.row === row && prevTurns[0].sqaure.col === col){
            return prevTurns;
          }
          const updatedTurns = [
            { sqaure: { row: row, col: col }, player: activePlayer },
            ...prevTurns,
          ];

          return updatedTurns;
        });
        
      });
    }
  }, [socket, room]);

  function handleUser(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      
      const updatedTurns = [
        { sqaure: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
    socket.emit("userMove", { row: rowIndex, col: colIndex, opponent, activePlayer });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange({ symbol, newName }) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  const handleGiveUp = (user) => {
    socket.emit('userGaveUp', room, user)
    setTimeout(function() {
      window.location.reload();
      setGameDisplay(false);
    }, 5000); 
  }

  return (
    <>
    {gameDisplay ? 
    <>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />

          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} restartMatch={handleRestart} />
        )}
        <GameBoard onSelectUser={handleUser} board={gameBoard} />
      </div>
      <button onClick={() => handleGiveUp(user)}>Give up</button>
      <Log turns={gameTurns} />
    </> : null}
    </>
  );
};

export default Game;
