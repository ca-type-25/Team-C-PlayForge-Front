
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import GameStudios from './pages/GameStudios';
import StudioDetail from './pages/StudioDetail';
import CreateStudio from './pages/CreateStudio';
import EditStudio from './pages/EditStudio';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Game Studios</Link>
      </nav>
      <Routes>
        <Route path="/" element={<GameStudios />} />
        <Route path="/studios/:id" element={<StudioDetail />} />
        <Route path="/studios/create" element={<CreateStudio />} />
        <Route path="/studios/:id/edit" element={<EditStudio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
