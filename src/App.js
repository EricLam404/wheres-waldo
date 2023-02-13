import './App.css';
import map from './pics/maps/beach.jpeg';

function App() {
  return (
    <div className="app">
      <div className='header'> Where's Waldo</div>
      <div className='container'>
        <img src={map} alt="loading map" className='map'/>
      </div>
    </div> 
  );
}

export default App;


/*
  Frontend:
    Show first map
    Start timer
    Display characters
    Add circle around cursor 
    Show charcters when clicked
    Check if clicked character
    End game if find all characters
    Add more maps with various difficulties
  Backend:
    Save highscores by a nickname
    Categorize each highscore by map
*/