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
      <div>
        <div>{player.name}</div>
        <div>{player.score}</div>
      </div>
    )
  }

  const isLastRound = wind === Seat.North && round == 4;

  return (
    <div>
      <div>Current Round: {getWind()} {round}</div>
      {showPlayer(north)}
      {showPlayer(east)}
      {showPlayer(south)}
      {showPlayer(west)}
      <button disabled={isLastRound} onClick={() => setCurrentPage("addScore")}>Add score</button>
      {isLastRound && <button onClick={() => setCurrentPage("home")}>Back to Home</button>}
    </div>
  )
}

export default Score;
