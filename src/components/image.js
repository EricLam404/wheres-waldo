import React, { useState, useEffect } from "react";
import map from '../pics/maps/beach.jpeg';
import CharacterList from "./characterList";
import "../css/image.css";

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
    const [circleY, setCircleY] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const mapElement = document.querySelector(".map");
            const mapRect = mapElement.getBoundingClientRect();

            const waldoElement = document.querySelector(".character-waldo");
            const wendaElement = document.querySelector(".character-wenda");
            const whitebeardElement = document.querySelector(".character-whitebeard");
            const odlawElement = document.querySelector(".character-odlaw");

            waldoElement.style.left = `${(mapRect.left > 0 ? mapRect.left : 0) + 915}px`;
            waldoElement.style.top = `${mapRect.top + 251}px`;

            wendaElement.style.left = `${(mapRect.left > 0 ? mapRect.left : 0) + 1150}px`;
            wendaElement.style.top = `${mapRect.top + 278}px`;

            whitebeardElement.style.left = `${(mapRect.left > 0 ? mapRect.left : 0) + 397}px`;
            whitebeardElement.style.top = `${mapRect.top + 233}px`;

            odlawElement.style.left = `${(mapRect.left > 0 ? mapRect.left : 0) + 150}px`;
            odlawElement.style.top = `${mapRect.top + 238}px`;
        };

        handleResize();
        window.addEventListener("resize", handleResize);
    }, []);

    const handleClick = event => {
        setShowCircle(!showCircle);
        setCircleX(event.clientX);
        setCircleY(event.clientY);
    };
    const handleCharacterSelect = (e, character) => {
        const characterElement = document.querySelector(`.character-${character}`);
        const characterRect = characterElement.getBoundingClientRect();
        if(circleX >= characterRect.left && circleX <= characterRect.right && circleY >= characterRect.top && circleY <= characterRect.bottom){
            const found = document.querySelector(`.${character}`);
            found.classList.add("found");
        }
        setShowCircle(false);
    };

    return (
        <div onClick={handleClick} className="img-container">
        <img src={map} alt="loading map" className='map'/>
        <div className="character-hidden">
            <div className="hitbox character-waldo"></div>
            <div className="hitbox character-wenda"></div>
            <div className="hitbox character-whitebeard"></div>
            <div className="hitbox character-odlaw"></div>
        </div>
        <Circle show={showCircle} x={circleX} y={circleY} handleCharacterSelect={handleCharacterSelect}/>
        </div>
    );
};


export default Image;