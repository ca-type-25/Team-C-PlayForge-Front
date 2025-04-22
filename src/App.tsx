import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import GamesPage from './pages/GamesPage'
import GamePage from './pages/GamePage'
import CreateGamePage from './pages/CreateGamePage'
import EditGamePage from './pages/EditGamePage'
import ReviewsPage from './pages/ReviewsPage'
import ReviewPage from './pages/ReviewPage'
import CreateReviewPage from './pages/CreateReviewPage'
import EditReviewPage from './pages/EditReviewPage'
import CommentsPage from './pages/CommentsPage'
import CommentPage from './pages/CommentPage'
import CreateCommentPage from './pages/createCommentPage'
import EditCommentPage from './pages/EditCommentPage'
import GameStudios from './pages/GameStudios';
import StudioDetail from './pages/StudioDetail';
import CreateStudio from './pages/CreateStudio';
import EditStudio from './pages/EditStudio';
import ArticlePage from './pages/ArticlePage/ArticlePage'; 
import ArticlesPage from './pages/ArticlesPage/ArticlesPage'; 
import CreateArticlePage from './pages/CreateArticlePage/CreateArticlePage';
import EditArticlePage from './pages/EditArticlePage/EditArticlePage';
import SubjectsPage from './pages/SubjectsPage/SubjectsPage'
import CreateSubjectPage from './pages/CreateSubjectPage/CreateSubjectPage'
import EditSubjectPage from './pages/EditSubjectPage/EditSubjectPage'
import SubjectPage from './pages/SubjectPage/SubjectPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminRoute from './components/AdminRoute'




const App: React.FC = () => {
  return (
    <BrowserRouter>
      <nav className="navbar" style={{ display: 'flex', gap: '10px' }}>
        <Link to="/studios">Game Studios</Link>
        <Link to="/games">Games</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/subjects">Subjects</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        
      </nav>
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

          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/comments:id" element={<CommentPage />} />
          <Route path="/comments/create" element={<CreateCommentPage />} />
          <Route path="/comments/edit/:id" element={<EditCommentPage />} />
          
          <Route path="/studios" element={<GameStudios />} />
          <Route path="/studios/:id" element={<StudioDetail />} />
         
          <Route path="/studios/create" element={<CreateStudio />} />
          <Route path="/studios/:id/edit" element={<EditStudio />} />

          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/create" element={<CreateArticlePage />} />
          <Route path="/articles/:id/edit" element={<EditArticlePage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />


          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subjects/create" element={<CreateSubjectPage />} />
          <Route path="/subjects/:id/edit" element={<EditSubjectPage />} />
          <Route path="/subjects/:id" element={<SubjectPage />} />

          <Route path="/" element={<h1>Home</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />



        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
