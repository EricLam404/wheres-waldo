import React, { useState, useEffect } from "react";
import './css/App.css';
import Timer from './components/timer';
import Image from './components/image';
import waldo from './pics/characters/waldo.jpeg';
import wenda from './pics/characters/wenda.png';
import whitebeard from './pics/characters/whitebeard.jpeg';
import odlaw from './pics/characters/odlaw.jpeg';
import { Link } from 'react-router-dom';

function App({getFirestore, collection, addDoc, serverTimestamp}) {
  async function saveScore(name, time) {
    try {
      await addDoc(collection(getFirestore(), 'highscores'), {
        name: name,
        time: time,
        timestamp: serverTimestamp()
      });
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }
  
  const [found, setFound] = useState(
    {
        waldo: false,
        wenda: false,
        whitebeard: false,
        odlaw: false
    }
  );
  const [timer, setTimer] = useState(true);
  const [time, setTime] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [change, setChange] = useState("");
  const [name, setName] = useState("");
  const [showWon, setShowWon] = useState(false);
  
  const checkWinner = () => {
    const win = Object.values(found).every(value => value);
    if(win){
      setTimer(false);
    }
  };

  const handleFound = (char) => {
    setFound({...found, [char]: true});
  };

  const handleTime = (t) => {
    setTime(t);
  }

  const handleWrong = (state) => {
    setShowAlert(state);
  }

  useEffect(() => {
    checkWinner();
  }, [found]);

  useEffect(() => {
    if (!timer) {
      console.log("Timer stopped");
    }
  }, [timer]);

  useEffect(() => {
    if (time !== 0 && name !== "") {
      saveScore(name, time);
      setName("");
      setTime(0);
      setChange(0);
      setShowWon(true);
      const input = document.querySelector(".input-container");
      if(input) input.classList.add("hidden");
    }
  }, [time, name]);
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [showAlert]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWon(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [showWon]);

  return (
    <div className="app">
      <div className='header'> Where's Waldo</div>
      <div className='timer-container'>
        <Timer timer={timer} handleTime={handleTime}/>
      </div>
      <div className='container'>
        <div>
          <Image handleFound={handleFound} handleWrong={handleWrong}/>
        </div>
        <div className='characters'>
          <div className='character waldo'>
            <div className='character-name'>Waldo</div>
            <img src={waldo} alt='waldo'/>
          </div>
          <div className='character wenda'>
            <div className='character-name'>Wenda</div>
            <img src={wenda} alt='wenda'/>
          </div>
          <div className='character whitebeard'>
            <div className='character-name'>Whitebeard</div>
            <img src={whitebeard} alt='whitebeard'/>
          </div>
          <div className='character odlaw'>
            <div className='character-name'>Odlaw</div>
            <img src={odlaw} alt='odlaw'/>
          </div>
        </div>
      </div>
      <Link to="/highscores">
        <div>Leaderboard/Highscores</div>
      </Link>
      {showAlert && <div className="alert"><p>You did not click the character</p></div>}
      {Object.values(found).every(value => value) && 
        <div className="input-container">
          <input
          type="text"
          value={change}
          onChange={(event) => setChange(event.target.value)}
          onBlur={(event) => {
            const enteredName = event.target.value.trim();
            if (enteredName) {
              setName(enteredName);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const enteredName = event.target.value.trim();
              if (enteredName) {
                setName(enteredName);
              }
            }
          }}
          placeholder="Enter your name"
          className="input-field"
        />    
      </div>
      }
      {showWon && <div className="alert won"><p>Score Saved!</p></div>}

    </div> 
  );
}

export default App;

/*
  Alert when win/ask for username
  page for high scores
*/