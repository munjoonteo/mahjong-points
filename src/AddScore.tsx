import { useContext, useState } from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

import { GameContext, IPlayer, Seat } from "./GameContext";
import points from "./points";

const AddScore = () => {
  const [winner, setWinner] = useState('');
  const [loser, setLoser] = useState('');
  const [score, setScore] = useState(1);

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

  const nextRound = () => {
    if (wind === Seat.North && round == 4) return;

    const newRound = round % 4 + 1;
    setRound(newRound)
    if (newRound === 1) setWind(wind + 1);
  }

  const handleDraw = () => {
    nextRound();
    setCurrentPage("score");
  }

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

    if (winnerPlayer.seat !== Seat.East) nextRound();

    setCurrentPage("score")
  }

  return (
    <>
      <Dropdown className="my-5" options={options} onChange={(w) => setWinner(w.value)} value={winner} placeholder='Select winner...' />
      <Dropdown className="my-5" options={[...options, 'Self-Draw']} onChange={(l) => setLoser(l.value)} value={loser} placeholder='Select loser...' />
      <Dropdown
        className="my-5"
        options={[...Array(12).keys()].map(x => (x + 1).toString())}
        onChange={(v) => setScore(parseInt(v.value))} value={score.toString()}
        placeholder='Points'
      />
      <div className="flex">
        <button className="text-black bg-slate-100 rounded-md w-full py-1 px-5 mr-1 my-3" onClick={handleAddScore}>Add Score</button>
        <button className="border-2 border-slate-200 rounded-md w-full py-1 px-5 ml-1 my-3" onClick={handleDraw}>Draw</button>
      </div>
        <button className="text-black bg-slate-100 rounded-md w-full py-1 px-5 ml-1 my-3" onClick={() => setCurrentPage("score")}>Cancel</button>
    </>
  )
}

export default AddScore;
