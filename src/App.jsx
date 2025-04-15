import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import GamesPage from './pages/gamesPage'
import GamePage from './pages/gamePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
