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
import TopicsPage from './pages/topics/TopicsPage'

import CreateTopicPage from './pages/topics/CreateTopicPage'
import EditTopicPage from './pages/topics/EditTopicPage'



import AdminRoute from './components/AdminRoute'
import Navbar from './components/NavBar'
import { GamesProvider } from './contexts/GamePageContext'
import TopicPage from './pages/topics/TopicPage'
import { TopicProvider } from './contexts/TopicContext'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ArticleProvider>
        <TopicProvider>
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

          {/* Admin-Only Routes */}
          <Route path="/games/create" element={
            <AdminRoute>
              <CreateGamePage />
            </AdminRoute>
          } />
          <Route path="/games/edit/:id" element={
            <AdminRoute>
              <EditGamePage />
            </AdminRoute>
          } />
          <Route path="/reviews/create" element={
            <AdminRoute>
              <CreateReviewPage />
            </AdminRoute>
          } />
          <Route path="/reviews/edit/:id" element={
            <AdminRoute>
              <EditReviewPage />
            </AdminRoute>
          } />
          <Route path="/comments/create" element={
            <AdminRoute>
              <CreateCommentPage />
            </AdminRoute>
          } />
          <Route path="/comments/edit/:id" element={
            <AdminRoute>
              <EditCommentPage />
            </AdminRoute>
          } />
          <Route path="/studios/create" element={
            <AdminRoute>
              <CreateStudio />
            </AdminRoute>
          } />
          <Route path="/studios/:id/edit" element={
            <AdminRoute>
              <EditStudio />
            </AdminRoute>
          } />
          <Route path="/articles/create" element={
            <AdminRoute>
              <CreateArticlePage />
            </AdminRoute>
          } />
          <Route path="/articles/:id/edit" element={
            <AdminRoute>
              <EditArticlePage />
            </AdminRoute>
          } />
          <Route path="/genres/create" element={
            <AdminRoute>
              <CreateGenrePage />
            </AdminRoute>
          } />
          <Route path="/genres/edit/:id" element={
            <AdminRoute>
              <EditGenrePage />
            </AdminRoute>
          } />
          <Route path="/subjects/create" element={
            <AdminRoute>
              <CreateSubjectPage />
            </AdminRoute>
          } />
          <Route path="/subjects/:id/edit" element={
            <AdminRoute>
              <EditSubjectPage />
            </AdminRoute>
          } />
          <Route path="/topics/create" element={
            <AdminRoute>
              <CreateTopicPage />
            </AdminRoute>
          } />
          <Route path="/topics/:id/edit" element={
            <AdminRoute>
              <EditTopicPage />
            </AdminRoute>
          } />
          {/* Remove the extra closing brace below */}
        </Routes>
        </TopicProvider>
      </ArticleProvider>
    </BrowserRouter>
  )
}

export default App;
