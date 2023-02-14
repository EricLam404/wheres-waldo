import React, { useState } from "react";
import map from '../pics/maps/beach.jpeg';
import CharacterList from "./characterList";
import "../css/circle.css";

function Circle({ show, x, y, handleCharacterSelect }){
  return show ? (
    <div>
        <div className="circle" style={{ left: x - 10, top: y - 10 }}/>
        <CharacterList x={x} y={y} handleCharacterSelect={handleCharacterSelect}/>
    </div>
  ) : null;
};

function Image(){
    const [showCircle, setShowCircle] = useState(false);
    const [circleX, setCircleX] = useState(0);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [circleY, setCircleY] = useState(0);

    const handleClick = event => {
        setShowCircle(!showCircle);
        setCircleX(event.clientX);
        setCircleY(event.clientY);
    };
    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
        setShowCircle(false);
    };

    return (
        <div onClick={handleClick}>
        <img src={map} alt="loading map" className='map'/>
        <Circle show={showCircle} x={circleX} y={circleY} handleCharacterSelect={handleCharacterSelect}/>
        </div>
    );
};


export default Image;