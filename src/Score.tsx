import React, { useContext, useEffect } from "react"
import { GameContext, IPlayer, Seat } from "./GameContext"

const Score: React.FC = () => {
  const { north, east, south, west, wind, round, setCurrentPage } = useContext(GameContext);

  useEffect(() => {
    const data = JSON.stringify({ wind, round, east, south, west, north });
    localStorage.setItem("data", data);
  }, [])

  const getWind = () => {
    const winds = ['East', 'South', 'West', 'North'];

    return winds[wind];
  }

  const showPlayer = (player: IPlayer) => {
    return (
      <>
        <div className="font-bold text-lg text-center">{player.name}</div>
        <div className="text-center">{player.score}</div>
      </>
    )
  }

  const isLastRound = wind === Seat.North && round == 4;

  return (
    <>
      <div className="text-center underline">Current Round: {getWind()} {round}</div>
      <div className="h-80">
        <div className="absolute top-1/3 left-1/2 -translate-y-12">{showPlayer(north)}</div>
        <div className="absolute top-1/3 left-1/2 translate-x-20 translate-y-12">{showPlayer(east)}</div>
        <div className="absolute top-1/3 left-1/2 translate-y-32">{showPlayer(south)}</div>
        <div className="absolute top-1/3 left-1/2 -translate-x-20 translate-y-12">{showPlayer(west)}</div>
      </div>
      <button className="text-black bg-slate-100 rounded-md w-full py-1 px-5 my-3" disabled={isLastRound} onClick={() => setCurrentPage("addScore")}>Add score</button>
      <button className="border-2 border-slate-200 rounded-md w-full py-1 px-5 my-3" onClick={() => setCurrentPage("home")}>Back to Home</button>
    </>
  )
}

export default Score;
