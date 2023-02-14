import React from "react";
import "../css/characterList.css";

function CharacterList({ x, y, onCharacterSelect }){
  const characters = ["Waldo", "Wanda", "Whitebeard", "Odlaw"];

  return (
    <ul className="character-list" style={{ left: x + 20, top: y - 30 }}>
      {characters.map((char, index) => (
        <li key={index} onClick={() => onCharacterSelect(char)}>
          {char}
        </li>
      ))}
    </ul>
  );
};

export default CharacterList