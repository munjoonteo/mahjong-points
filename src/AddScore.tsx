import { useContext, useState } from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

import { GameContext, IPlayer, Seat } from "./GameContext";
import points from "./points";

const AddScore = () => {
  const [winner, setWinner] = useState('');
  const [loser, setLoser] = useState('');
  const [score, setScore] = useState(0);

  const { north, setNorth, east, setEast, south, setSouth, west, setWest, wind, setWind, round, setRound, setCurrentPage } = useContext(GameContext);

  const options = [
    north.name,
    east.name,
    south.name,
    west.name,
  ]

  const players = {
    [Seat.North]: north,
    [Seat.East]: east,
    [Seat.South]: south,
    [Seat.West]: west,
  }

  const setPlayerScore = (playerScore: number, player: IPlayer, setPlayer: (newPlayer: IPlayer) => void) => {
    setPlayer({ ...player, score: player.score + playerScore })
  }

  const getPlayer = (name: string): [IPlayer, (newPlayer: IPlayer) => void] => {
    if (name === north.name) {
      return [north, setNorth];
    } else if (name === east.name) {
      return [east, setEast];
    } else if (name === south.name) {
      return [south, setSouth];
    } else {
      return [west, setWest];
    }
  }
  ``
  const handleAddScore = () => {
    if (winner === loser || !(winner && loser && score)) return;

    const translatedScore = points[score];

    const [winnerPlayer, winnerSetter] = getPlayer(winner);

    if (loser !== 'Self-Draw') {
      const [loserPlayer, loserSetter] = getPlayer(loser);

      setPlayerScore(translatedScore, winnerPlayer, winnerSetter);
      setPlayerScore(translatedScore * -1, loserPlayer, loserSetter);
    } else {
      setPlayerScore(translatedScore * 1.5, winnerPlayer, winnerSetter);

      for (const seat of [Seat.North, Seat.East, Seat.South, Seat.West]) {
        const player = players[seat];
        const [_, playerSetter] = getPlayer(player.name);
        if (player.name !== winnerPlayer.name) {
          setPlayerScore(translatedScore * -0.5, player, playerSetter);
        }
      }
    }

    if (winnerPlayer.seat !== Seat.East) {
      const newRound = (round + 1) % 4;
      setRound(newRound) 
      if (newRound === 0) setWind(wind + 1);
    }

    setCurrentPage("score")
  }

  return (
    <>
      <Dropdown options={options} onChange={(w) => setWinner(w.value)} value={winner} placeholder='Winner' />
      <Dropdown options={[...options, 'Self-Draw']} onChange={(l) => setLoser(l.value)} value={loser} placeholder='Loser' />
      <Dropdown
        options={[...Array(12).keys()].map(x => (x + 1).toString())}
        onChange={(v) => setScore(parseInt(v.value))} value={score.toString()}
        placeholder='Points'
      />
      <button onClick={handleAddScore}>Add Score</button>
    </>
  )
}

export default AddScore;
