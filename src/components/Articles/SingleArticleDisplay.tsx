import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { getArticleById, deleteArticle } from '../../api/articlesApi';
import { useArticle } from '../../contexts/ArticleContext';
import { getAllUsers, User as FullUser } from '../../api/usersApi';

type User = { _id: string; username: string, name?: string };
type Subject = { _id: string; title: string; description?: string };


const SingleArticleDisplay: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { article, setArticle, isLoading, setIsLoading, error, setError } = useArticle();
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const [allUsers, setAllUsers] = React.useState<FullUser[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError('Article ID is missing.');
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const articleData = await getArticleById(id);
        setArticle(articleData);
        setError(null);
      } catch (err: unknown) { 
        console.error('Error fetching article:', err); 
        setError('Failed to fetch article');
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch all users for mapping IDs to usernames
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setAllUsers(response.data || []);
      } catch (err: unknown) {
        console.error('Error fetching users:', err);
        setAllUsers([]);
      }
    };
    fetchUsers();
    fetchArticle();
    
    return () => {
      setArticle(null);
      setError(null);
    };
  }, [id, setArticle, setError, setIsLoading]);

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      setIsLoading(true);
      await deleteArticle(id);
      setIsLoading(false);
      navigate('/articles');
    } catch (err) {
      setIsLoading(false);
      setDeleteError('Failed to delete article. Please try again.');
      console.error('Error deleting article:', err);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading article...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (!article) {
    return <div className="text-center mt-5">Article not found or failed to load.</div>;
  }

  return (
    <Container className="mt-4">
      <Link to="/articles" className="btn btn-outline-secondary mb-4">
        &larr; Back to Articles
      </Link>
      {deleteError && <Alert variant="danger">{deleteError}</Alert>}
      <Card className="border-0 shadow-sm">
        {article.image && (
          <div className="article-image-container">
            <img 
              src={article.image} 
              alt={article.title} 
              className="article-header-image img-fluid" 
            />
          </div>
        )}
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="mb-3">{article.title}</h1>
            <div className="d-flex gap-2">
              <Link to={`/articles/${article._id}/edit`} className="btn btn-outline-primary">
                Edit
              </Link>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
          <div className="mb-4">
            <small className="text-muted">
              Published on {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Unknown date'}
            </small>
          </div>
          {/* Add users display */}
          {article.users && article.users.length > 0 && (
            <div className="mb-2">
              <strong>Users:</strong> {
                (article.users as (string | User)[])
                  .map(user => {
                    if (typeof user === 'object' && user !== null) {
                      if ('username' in user) return (user as User).username;
                      if ('name' in user) return (user as User).name;
                      return JSON.stringify(user);
                    }
                    // If user is a string (ID), try to find the username
                    const found = allUsers.find(u => u._id === user);
                    return found ? found.username : user;
                  })
                  .join(', ')
              }
            </div>
          )}
          {/* Add subjects display */}
          {article.subjects && article.subjects.length > 0 && (
            <div className="mb-2">
              <strong>Subjects:</strong> {
                (article.subjects as (string | Subject)[])
                  .map(subject =>
                    typeof subject === 'object' && subject !== null && 'title' in subject
                      ? subject.title
                      : subject
                  )
                  .join(', ')
              }
            </div>
          )}
          <div className="article-content">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {article.video && (
            <div className="mt-4">
              <h4>Video</h4>
              <div className="ratio ratio-16x9">
                <iframe 
                  src={article.video} 
                  title={article.title} 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingleArticleDisplay;