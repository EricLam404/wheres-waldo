import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import "../css/highscores.css";

function Highscores({query, collection, getFirestore, orderBy, onSnapshot}){
  const [scores, setScores] = useState([]);

  const loadScores = () => {
    const scoresQuery = query(collection(getFirestore(), 'highscores'), orderBy('time', 'desc'));
    onSnapshot(scoresQuery, function(snapshot) {
      console.log(snapshot)
      snapshot.docChanges().forEach(function(change) {
        console.log(change.doc.data());
      });
    })
    return scoresQuery;
  }
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(getFirestore(), 'highscores'), (querySnapshot) => {
      const scoresData = [];
      querySnapshot.forEach((doc) => {
        scoresData.push({ id: doc.id, ...doc.data() });
      });
      scoresData.sort((a, b) => a.time - b.time);
      setScores(scoresData);
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div className="leaderboard-container">
      <div className="header">
        <div className="leaderboard-name">Leaderboard</div>
        <Link to="/">
          <div>Home</div>
        </Link>
      </div>
      <div className="highscores">
        {scores.map((score) => (
          <div key={score.id} className="score">
            <h2 className="name">{score.name[0].toUpperCase() + score.name.substring(1)}</h2>
            <p className="score">{score.time} Seconds</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highscores