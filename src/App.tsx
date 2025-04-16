import { Routes, Route } from 'react-router-dom';
import StudioPage from './pages/StudioPage';


const App = () => {
  return (
    <Routes>
      <Route path="/studios/:id" element={<StudioPage />} />
    </Routes>
  );
};

export default App;
