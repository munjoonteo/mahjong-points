import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameContext";
import { NameInputProps } from "./PropTypes";

const NameInput: React.FC<NameInputProps> = ({ seat, name, setName }) => {
  return (
    <div className="flex justify-between items-center w-full my-2">
      {seat}
      <input
        className="text-black rounded-md px-2 mx-2 my-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  )
}

const Players: React.FC = () => {
  const [eastName, setEastName] = useState('');
  const [southName, setSouthName] = useState('');
  const [westName, setWestName] = useState('');
  const [northName, setNorthName] = useState('');
  const [isErr, setIsErr] = useState(false);

  const { east, setEast, south, setSouth, west, setWest, north, setNorth, setCurrentPage } = useContext(GameContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isErr) setIsErr(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isErr])

  const handleSetPlayerNames = () => {
    if (!(eastName && southName && westName && northName)) {
      setIsErr(true);
      return;
    }

    setEast({ ...east, name: eastName });
    setSouth({ ...south, name: southName });
    setWest({ ...west, name: westName });
    setNorth({ ...north, name: northName });

    setCurrentPage("score");
  }

  return (
    <>
      <NameInput seat="East" name={eastName} setName={setEastName} />
      <NameInput seat="South" name={southName} setName={setSouthName} />
      <NameInput seat="West" name={westName} setName={setWestName} />
      <NameInput seat="North" name={northName} setName={setNorthName} />
      <div className="flex flex-col align-middle items-center">
        <button className="text-black bg-slate-100 rounded-md w-full py-1 px-5 mx-2 my-3" onClick={handleSetPlayerNames}>Create Game</button>
        <button className="border-2 border-slate-200 rounded-md w-full py-1 px-5 mx-2 my-3" onClick={() => setCurrentPage("home")}>Cancel</button>
      </div>
      {isErr && <div className="text-center font-bold">Please enter all players' names</div>}
    </>
  )
}

export default Players;
