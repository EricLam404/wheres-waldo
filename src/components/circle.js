import React, { useState, useEffect } from "react";
import map from '../pics/maps/beach.jpeg';
import CharacterList from "./characterList";
import "../css/circle.css";

function Circle({ show, x, y, handleCharacterSelect }){
  return show ? (
    <div>
        <div className="circle" style={{ left: x - 10, top: y - 10 }}/>
        <CharacterList x={x} y={y} onCharacterSelect={handleCharacterSelect}/>
    </div>
  ) : null;
};

function Image(){
    const [showCircle, setShowCircle] = useState(false);
    const [circleX, setCircleX] = useState(0);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [circleY, setCircleY] = useState(0);

    useEffect(() => {
        const mapElement = document.querySelector(".map");
        const waldoElement = document.querySelector(".character-waldo");
        const handleResize = () => {
            const mapRect = mapElement.getBoundingClientRect();
            waldoElement.style.left = `${(mapRect.left > 0 ? mapRect.left : 0) + 915}px`;
            waldoElement.style.top = `${mapRect.top + 251}px`;
        };
        const mapRect = mapElement.getBoundingClientRect();

        waldoElement.style.left = `${(mapRect.left > 0 ? mapRect.left : 0) + 915}px`;
        waldoElement.style.top = `${mapRect.top + 252}px`;
        window.addEventListener("resize", handleResize);
    }, []);

    const handleClick = event => {
        setShowCircle(!showCircle);
        setCircleX(event.clientX);
        setCircleY(event.clientY);
    };
    const handleCharacterSelect = (e, character) => {
        const characterElement = document.querySelector(`.character-${character}`);
        if(!characterElement) return;
        const characterRect = characterElement.getBoundingClientRect();
        if(circleX >= characterRect.left && circleX <= characterRect.right && circleY >= characterRect.top && circleY <= characterRect.bottom){
            console.log(character);
        }

        setSelectedCharacter(character);
        setShowCircle(false);
    };

    return (
        <div onClick={handleClick} className="img-container">
        <img src={map} alt="loading map" className='map'/>
        <div className="character-waldo" style={{left: '69.4%', top: '40%'}}></div>
        <Circle show={showCircle} x={circleX} y={circleY} handleCharacterSelect={handleCharacterSelect}/>
        </div>
    );
};


export default Image;