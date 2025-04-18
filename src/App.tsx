import { BrowserRouter, Route, Routes, Link } from 'react-router'

import GamesPage from './pages/GamesPage'
import GamePage from './pages/GamePage'
import CreateGamePage from './pages/CreateGamePage'
import EditGamePage from './pages/EditGamePage'
import GameStudios from './pages/GameStudios';
import StudioDetail from './pages/StudioDetail';
import CreateStudio from './pages/CreateStudio';
import EditStudio from './pages/EditStudio';



function App() {

  return (
    <BrowserRouter>
      <nav className="navbar" style={{ display: 'flex', gap: '10px' }}>
        <Link to="/studios">Game Studios</Link>
        <Link to="/games">Games</Link>
        
      </nav>
      <Routes>
        <Route>
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GamePage />} />
          <Route path="/games/create" element={<CreateGamePage />} />
          <Route path="/games/edit/:id" element={<EditGamePage />} />
          <Route path="/studios" element={<GameStudios />} />
          <Route path="/studios/:id" element={<StudioDetail />} />
          <Route path="/studios/create" element={<CreateStudio />} />
          <Route path="/studios/:id/edit" element={<EditStudio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
