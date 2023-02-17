import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Highscores from "./components/highscores";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/highscores" element={<Highscores />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;