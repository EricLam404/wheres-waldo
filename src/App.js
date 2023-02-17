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
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
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
  
  const checkWinner = () => {
    const win = Object.values(found).every(value => value);
    console.table(found);
    console.log(win);
  };

  const handleFound = (char) => {
    setFound({...found, [char]: true});
  };

  useEffect(() => {
    checkWinner();
  }, [found]);

  return (
    <div className="app">
      <div className='header'> Where's Waldo</div>
      <div className='timer-container'>
        <Timer/>
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