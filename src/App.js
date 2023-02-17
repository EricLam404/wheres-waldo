import React, { useState, useEffect } from "react";
import './css/App.css';
import Timer from './components/timer';
import Image from './components/image';
import waldo from './pics/characters/waldo.jpeg';
import wenda from './pics/characters/wenda.png';
import whitebeard from './pics/characters/whitebeard.jpeg';
import odlaw from './pics/characters/odlaw.jpeg';

//firebase imports
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "wheres-waldo-b6824.firebaseapp.com",
  projectId: "wheres-waldo-b6824",
  storageBucket: "wheres-waldo-b6824.appspot.com",
  messagingSenderId: "224090004514",
  appId: "1:224090004514:web:ae41c14b996ba517727e7b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

function App() {
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

  useEffect(() => {
    checkWinner();
  }, [found]);

  useEffect(() => {
    if (!timer) {
      console.log("Timer stopped");
    }
  }, [timer]);

  useEffect(() => {
    if (time != 0) {
      saveScore("temp", time);
    }
  }, [time]);

  return (
    <div className="app">
      <div className='header'> Where's Waldo</div>
      <div className='timer-container'>
        <Timer timer={timer} handleTime={handleTime}/>
      </div>
      <div className='container'>
        <div>
          <Image handleFound={handleFound}/>
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
    </div> 
  );
}

export default App;