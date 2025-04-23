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
import GameStudios from './pages/Studios/GameStudios';
import StudioDetail from './pages/Studios/StudioDetail';
import CreateStudio from './pages/Studios/CreateStudio';
import EditStudio from './pages/Studios/EditStudio';
import ArticlePage from './pages/ArticlePage/ArticlePage'; 
import ArticlesPage from './pages/ArticlesPage/ArticlesPage'; 
import CreateArticlePage from './pages/CreateArticlePage/CreateArticlePage';
import EditArticlePage from './pages/EditArticlePage/EditArticlePage';
import GenresPage from './pages/GenresPage'
import GenrePage from './pages/GenrePage'
import CreateGenrePage from './pages/CreateGenrePage'
import EditGenrePage from './pages/EditGenrePage'
import { ArticleProvider } from './contexts/ArticleContext';
import SubjectsPage from './pages/SubjectsPage/SubjectsPage'
import CreateSubjectPage from './pages/CreateSubjectPage/CreateSubjectPage'
import EditSubjectPage from './pages/EditSubjectPage/EditSubjectPage'
import SubjectPage from './pages/SubjectPage/SubjectPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TopicsPage from './pages/TopicsPage/TopicsPage'
import TopicPage from './pages/TopicPage/TopicPage'
import CreateTopicPage from './pages/CreateTopicPage/CreateTopicPage'
import EditTopicPage from './pages/EditTopicPage/EditTopicPage'




const App: React.FC = () => {
  return (
    <BrowserRouter>
      <nav className="navbar" style={{ display: 'flex', gap: '10px' }}>
        <Link to="/studios">Game Studios</Link>
        <Link to="/games">Games</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/topics">Topics</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        
      </nav>
      <Routes>
        <Route>
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GamePage />} />

          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/reviews/:id" element={<ReviewPage />} />

          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/comments/:id" element={<CommentPage />} />

          <Route path="/studios" element={<GameStudios />} />
          <Route path="/studios/:id" element={<StudioDetail />} />
          <Route path="/studios/create" element={<CreateStudio />} />
          <Route path="/studios/:id/edit" element={<EditStudio />} />
          
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />

          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:id" element={<TopicPage />} />
          <Route path="/topics/create" element={<CreateTopicPage />} />
          <Route path="/topics/:id/edit" element={<EditTopicPage />} />

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
