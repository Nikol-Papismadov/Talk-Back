import { useState } from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
    
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditable, setIsEditable] = useState(false);
  let display = <span className="player-name">{playerName}</span>;
  let btnName = "Edit";

  function handleClick() {
    setIsEditable((edititng) => !edititng);
    isEditable && onChangeName(symbol, playerName);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  if(isEditable) {
    display = <input type="text" value={playerName} onChange={handleChange} required/>;
    btnName = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {display}  
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{btnName}</button>
    </li>
  );
}