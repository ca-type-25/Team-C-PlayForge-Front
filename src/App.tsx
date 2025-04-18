import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import GamesPage from './pages/GamesPage'
import GamePage from './pages/GamePage'
import CreateGamePage from './pages/CreateGamePage'
import EditGamePage from './pages/EditGamePage'
import ReviewsPage from './pages/ReviewsPage'
import ReviewPage from './pages/ReviewPage'
import CreateReviewPage from './pages/CreateReviewPage'
import EditReviewPage from './pages/EditReviewPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GamePage />} />
          <Route path="/games/create" element={<CreateGamePage />} />
          <Route path="/games/edit/:id" element={<EditGamePage />} />

          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/reviews/:id" element={<ReviewPage />} />
          <Route path="/reviews/create" element={<CreateReviewPage />} />
          <Route path="/reviews/edit/:id" element={<EditReviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
