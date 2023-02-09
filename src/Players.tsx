import React, { useContext, useState } from "react";
import { GameContext } from "./GameContext";
import { NameInputProps } from "./PropTypes";

const NameInput: React.FC<NameInputProps> = ({ name, setName }) => {
  return <input value={name} onChange={(e) => setName(e.target.value)} />
}

const Players: React.FC = () => {
  const [northName, setNorthName] = useState('');
  const [eastName, setEastName] = useState('');
  const [southName, setSouthName] = useState('');
  const [westName, setWestName] = useState('');

  const { north, setNorth, east, setEast, south, setSouth, west, setWest, setCurrentPage } = useContext(GameContext);


  const handleSetPlayerNames = () => {
    if (!(northName && eastName && southName && westName)) return;

    setNorth({ ...north, name: northName });
    setEast({ ...east, name: eastName });
    setSouth({ ...south, name: southName });
    setWest({ ...west, name: westName });

    setCurrentPage("score");
  }

  return (
    <div>
      <div>
        <div>North: <NameInput name={northName} setName={setNorthName} /></div>
        <div>East: <NameInput name={eastName} setName={setEastName} /> </div>
        <div>South: <NameInput name={southName} setName={setSouthName} /> </div>
        <div>West: <NameInput name={westName} setName={setWestName} /> </div>
      </div>
      <button onClick={handleSetPlayerNames}>Submit</button>
      <button onClick={() => setCurrentPage("home")}>Cancel</button>
    </div>
  )
}

export default Players;
