import React, { useContext } from 'react'

import { GameContext } from './GameContext'

import AddScore from './AddScore'
import Home from './Home'
import Players from './Players'
import Score from './Score'

const App: React.FC = () => {
  const { currentPage } = useContext(GameContext)

  const getCurrPage = () => {
    if (currentPage === "home") {
      return <Home />;
    } else if (currentPage === "players") {
      return <Players />;
    } else if (currentPage === "score") {
      return <Score />;
    } else if (currentPage === "addScore") {
      return <AddScore />;
    } else {
      return <></>;
    }
  }

  return <>{getCurrPage()}</>
}

export default App
