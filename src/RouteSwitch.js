import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Highscores from "./components/highscores";

//firebase imports
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
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

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App getFirestore={getFirestore} collection={collection} addDoc={addDoc} serverTimestamp={serverTimestamp} />} />
        <Route path="/highscores" element={<Highscores query={query} getFirestore={getFirestore} collection={collection} orderBy={orderBy} onSnapshot={onSnapshot} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;