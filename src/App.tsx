import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GamesPage from './pages/games/GamesPage'
import GamePage from './pages/games/GamePage'
import CreateGamePage from './pages/games/CreateGamePage'
import EditGamePage from './pages/games/EditGamePage'
import ReviewsPage from './pages/reviews/ReviewsPage'
import ReviewPage from './pages/reviews/ReviewPage'
import CreateReviewPage from './pages/reviews/CreateReviewPage'
import EditReviewPage from './pages/reviews/EditReviewPage'
import CommentsPage from './pages/comments/CommentsPage'
import CommentPage from './pages/comments/CommentPage'
import CreateCommentPage from './pages/comments/createCommentPage'
import EditCommentPage from './pages/comments/EditCommentPage'
import GameStudios from './pages/Studios/GameStudios';
import StudioDetail from './pages/Studios/StudioDetail';
import CreateStudio from './pages/Studios/CreateStudio';
import EditStudio from './pages/Studios/EditStudio';
import ArticlePage from './pages/articles/ArticlePage'; 
import ArticlesPage from './pages/articles/ArticlesPage'; 
import CreateArticlePage from './pages/articles/CreateArticlePage/CreateArticlePage';
import EditArticlePage from './pages/articles/EditArticlePage';
import GenresPage from './pages/genres/GenresPage'
import GenrePage from './pages/genres/GenrePage'
import CreateGenrePage from './pages/genres/CreateGenrePage'
import EditGenrePage from './pages/genres/EditGenrePage'
import { ArticleProvider } from './contexts/ArticleContext';
import SubjectsPage from './pages/subjects/SubjectsPage'
import CreateSubjectPage from './pages/subjects/CreateSubjectPage'
import EditSubjectPage from './pages/subjects/EditSubjectPage'
import SubjectPage from './pages/subjects/SubjectPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TopicsPage from './pages/TopicsPage/TopicsPage'
import TopicPage from './pages/TopicPage/TopicPage'
import CreateTopicPage from './pages/CreateTopicPage/CreateTopicPage'
import EditTopicPage from './pages/EditTopicPage/EditTopicPage'



import AdminRoute from './components/AdminRoute'
import Navbar from './components/NavBar'
import { GamesProvider } from './contexts/GamePageContext'
import AdminPanelPage from './pages/adminPanelPage/AdminPanelPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ArticleProvider>
        <Routes>
        
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/games" element={
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          } />
          <Route path="/games/:id" element={
            <GamesProvider>
              <GamePage />
            </GamesProvider>
          } />

          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/reviews/:id" element={
            <GamesProvider>
              <ReviewPage />
            </GamesProvider>
          } />

          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/comments/:id" element={<CommentPage />} />

          <Route path="/studios" element={<GameStudios />} />
          <Route path="/studios/:id" element={<StudioDetail />} />

          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />

          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subjects/:id" element={<SubjectPage />} />

          <Route path="/genres" element={<GenresPage />} />
          <Route path="/genres/:id" element={<GenrePage />} />

          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:id" element={<TopicPage />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Routes>
                  <Route path="admin/panel" element={<AdminPanelPage />} />
                  <Route path="games/create" element={<CreateGamePage />} />
                  <Route path="games/edit/:id" element={<EditGamePage />} />
                  <Route path="reviews/create" element={<CreateReviewPage />} />
                  <Route path="reviews/edit/:id" element={<EditReviewPage />} />
                  <Route path="comments/create" element={<CreateCommentPage />} />
                  <Route path="comments/edit/:id" element={<EditCommentPage />} />
                  <Route path="studios/create" element={<CreateStudio />} />
                  <Route path="studios/:id/edit" element={<EditStudio />} />
                  <Route path="articles/create" element={<CreateArticlePage />} />
                  <Route path="articles/:id/edit" element={<EditArticlePage />} />
                  <Route path="genres/create" element={<CreateGenrePage />} />
                  <Route path="genres/edit/:id" element={<EditGenrePage />} />
                  <Route path="subjects/create" element={<CreateSubjectPage />} />
                  <Route path="subjects/:id/edit" element={<EditSubjectPage />} />
                  <Route path="topics/create" element={<CreateTopicPage />} />
                  <Route path="topics/:id/edit" element={<EditTopicPage />} />
                </Routes>
              </AdminRoute>
            }
          />
        </Routes>
      </ArticleProvider>
    </BrowserRouter>
  )
}

export default App;
