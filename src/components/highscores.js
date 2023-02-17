import React, {useState, useEffect} from "react";
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
      scoresData.sort((a, b) => b.time - a.time);
      setScores(scoresData);
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div>
      Highscores
      <div>
        {scores.map((score) => (
          <div key={score.id}>
            <h2>{score.name}</h2>
            <p>{score.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highscores