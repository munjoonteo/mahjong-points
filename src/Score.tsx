import React, { useContext } from "react"
import { GameContext, IPlayer } from "./GameContext"

const Score: React.FC = () => {
  const { north, east, south, west, wind, round, setCurrentPage } = useContext(GameContext);

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

  return (
    <div>
      <div>Current Round: {getWind()} {round}</div>
      {showPlayer(north)}
      {showPlayer(east)}
      {showPlayer(south)}
      {showPlayer(west)}
      <button onClick={() => setCurrentPage("addScore")}>Add score</button>
    </div>
  )
}

export default Score;
