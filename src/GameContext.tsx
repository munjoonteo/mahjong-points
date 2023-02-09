import { createContext, useState } from "react";
import { GameContextProviderProps } from "./PropTypes";

export enum Seat {
  East,
  South,
  West,
  North
}

export interface IPlayer {
  name: string;
  score: number;
  seat: Seat;
}

export interface IGameContext {
  east: IPlayer;
  setEast: (newEast: IPlayer) => void;
  south: IPlayer;
  setSouth: (newSouth: IPlayer) => void;
  west: IPlayer;
  setWest: (newWest: IPlayer) => void;
  north: IPlayer;
  setNorth: (newNorth: IPlayer) => void;
  wind: number;
  setWind: (newWind: number) => void;
  round: number;
  setRound: (newCompletedWinds: number) => void;
  currentPage: string;
  setCurrentPage: (newPage: string) => void;
}

const createNewPlayer = (seat: Seat) => ({
  name: '',
  score: 0,
  seat
})

export const GameContext = createContext<IGameContext>({
  east: createNewPlayer(Seat.East),
  setEast: () => { },
  south: createNewPlayer(Seat.South),
  setSouth: () => { },
  west: createNewPlayer(Seat.West),
  setWest: () => { },
  north: createNewPlayer(Seat.North),
  setNorth: () => { },
  wind: Seat.East,
  setWind: () => { },
  round: 1,
  setRound: () => { },
  currentPage: "home",
  setCurrentPage: () => { }
})

const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [east, setEast] = useState<IPlayer>(createNewPlayer(Seat.East))
  const [south, setSouth] = useState<IPlayer>(createNewPlayer(Seat.South))
  const [west, setWest] = useState<IPlayer>(createNewPlayer(Seat.West))
  const [north, setNorth] = useState<IPlayer>(createNewPlayer(Seat.North))
  const [wind, setWind] = useState(0);
  const [round, setRound] = useState(1);
  const [currentPage, setCurrentPage] = useState("home");

  const initialContext: IGameContext = {
    east,
    setEast,
    south,
    setSouth,
    west,
    setWest,
    north,
    setNorth,
    wind,
    setWind,
    round,
    setRound,
    currentPage,
    setCurrentPage,
  };

  return <GameContext.Provider value={initialContext}> {children} </GameContext.Provider>
};

export default GameContextProvider;

