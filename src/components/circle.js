import React, { useState } from "react";
import map from '../pics/maps/beach.jpeg';

function Circle({ show, x, y }){
  return show ? (
    <div
      style={{
        position: "fixed",
        left: x - 10,
        top: y - 10,
        width: "20px",
        height: "20px",
        borderRadius: "10px",
        border: "2px solid red",
        pointerEvents: "none"
      }}
    />
  ) : null;
};

const Image = () => {
  const [showCircle, setShowCircle] = useState(false);
  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);

  const handleClick = event => {
    setShowCircle(!showCircle);
    setCircleX(event.clientX);
    setCircleY(event.clientY);
  };

  return (
    <div onClick={handleClick}>
      <img src={map} alt="loading map" className='map'/>
      <Circle show={showCircle} x={circleX} y={circleY} />
    </div>
  );
};

export default Image;