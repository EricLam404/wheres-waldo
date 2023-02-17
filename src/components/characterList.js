import React from "react";
import "../css/characterList.css";

function CharacterList({ x, y, onCharacterSelect }){
  const characters = ["waldo", "wenda", "whitebeard", "odlaw"];

  return (
    <ul className="character-list" style={{ left: x + 20, top: y - 30 }}>
      {characters.map((char, index) => (
        <li key={index} onClick={(e) => onCharacterSelect(e, char)}>
          {char[0].toUpperCase() + char.substring(1)}
        </li>
      ))}
    </ul>
  );
};

export default CharacterList