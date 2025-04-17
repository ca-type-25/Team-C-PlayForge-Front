import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import GamesPage from './pages/GamesPage'
import GamePage from './pages/GamePage'
import CreateGamePage from './pages/CreateGamePage'
import EditGamePage from './pages/EditGamePage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GamePage />} />
          <Route path="/games/create" element={<CreateGamePage />} />
          <Route path="/games/edit/:id" element={<EditGamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
