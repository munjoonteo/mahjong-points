import React, { useContext } from "react";
import { GameContext } from "./GameContext";

const Home: React.FC = () => {
  const { setCurrentPage } = useContext(GameContext);

  return (
    <div>
      Mahjong Points Counter
      <button onClick={() => setCurrentPage("players")}>Start</button>
      <button onClick={() => setCurrentPage("settings")}>Settings</button>
    </div>
  )
}

export default Home;
