import React, { useContext } from "react";
import { GameContext, IPlayer } from "./GameContext";

interface Data {
  wind: number;
  round: number;
  east: IPlayer;
  south: IPlayer;
  west: IPlayer;
  north: IPlayer;
}

const Home: React.FC = () => {
  const { setEast, setSouth, setWest, setNorth, setWind, setRound, setCurrentPage } = useContext(GameContext);

  const handleLoadGame = () => {
    const data = localStorage.getItem("data");

    if (!data) return;

    const parsedData = JSON.parse(data) as Data;

    const { east, south, west, north, wind, round } = parsedData;

    setEast(east);
    setSouth(south);
    setWest(west);
    setNorth(north);
    setWind(wind);
    setRound(round);

    setCurrentPage("score");
  }

  return (
    <div className="flex flex-col">
      <div className="text-lg font-bold py-5">Mahjong Points Counter</div>
      <button className="text-black bg-slate-100 rounded-md p-1 my-3" onClick={() => setCurrentPage("players")}>New Game</button>
      <button className="border-2 border-slate-100 rounded-md p-1 my-3" onClick={handleLoadGame}>Load Game</button>
    </div>
  )
}

export default Home;
