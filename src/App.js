import './css/App.css';
import Timer from './components/timer';
import Image from './components/circle';
import waldo from './pics/characters/waldo.jpeg';
import wenda from './pics/characters/wenda.png';
import whitebeard from './pics/characters/whitebeard.jpeg';
import odlaw from './pics/characters/odlaw.jpeg';

function App() {
  return (
    <div className="app">
      <div className='header'> Where's Waldo</div>
      <div className='timer-container'>
        <Timer/>
      </div>
      <div className='container'>
        <div>
          <Image/>
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


/*
  Frontend:
    Check if clicked character
    End game if find all characters
  Backend:
    Save highscores by a nickname
    Categorize each highscore by map
*/