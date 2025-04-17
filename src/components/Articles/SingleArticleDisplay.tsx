import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Badge, Card, Row, Col, Button, Alert } from 'react-bootstrap';
import './ArticleDetail.css';

interface Subject {
  id: string;
  type: 'Game' | 'Studio' | 'Genre';
}

interface Article {
  _id: string;
  title: string;
  content: string;
  video?: string;
  image?: string;
  user?: string;
  subject?: Subject;
  createdAt: string;
  updatedAt: string;
}

const SingleArticleDisplay: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); 

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);


  useEffect(() => {
    setArticle(null);
    setLoading(true);
    setError(null);

    const fetchArticle = async () => {
      if (!id) {
          setError('Article ID is missing.');
          setLoading(false);
          return;
      }
      try {
        console.log(`Fetching article with ID: ${id}`);
        const response = await axios.get<Article>(`http://localhost:3000/articles/${id}`);
        console.log("API Response Data:", response.data);
        setArticle(response.data);
      } catch (err: unknown) { 
        console.error('Error fetching article:', err); 

        let message = 'Failed to fetch article'; 
        if (axios.isAxiosError(err)) { 
            message = err.response?.data?.message || err.message;
        } else if (err instanceof Error) { 
            message = err.message;
        }

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await axios.delete(`http://localhost:3000/articles/${id}`, {
      });
      navigate('/articles');
    } catch (err: unknown) {
      console.error('Error deleting article:', err);
      let message = 'Failed to delete article. Please try again.';
      if (axios.isAxiosError(err)) {
          message = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
          message = err.message;
      }
      setDeleteError(message);
      setIsDeleting(false); 
    }
  };


  if (loading) {
      console.log("Rendering: Loading state");
      return <div className="text-center mt-5">Loading article...</div>;
  }
  if (error) {
      console.log("Rendering: Error state -", error);
      return <div className="text-center mt-5 text-danger">{error}</div>;
  }
  if (!article) {
      console.log("Rendering: Article not found state (article is null/undefined)");
      return <div className="text-center mt-5">Article not found or failed to load.</div>;
  }

  console.log("Rendering: Article details for", article.title);
  return (
    <Container className="mt-4 article-detail">
       <Row className="mb-4 align-items-center"> 
         <Col>
           <Link to="/articles" className="btn btn-outline-secondary">
             &larr; Back to Articles
           </Link>
         </Col>
         <Col xs="auto" className="ms-auto"> 
           <Link to={`/articles/${id}/edit`} className="btn btn-primary me-2"> 
             Edit Article
           </Link>
           <Button
             variant="danger"
             onClick={handleDelete}
             disabled={isDeleting} 
           >
             {isDeleting ? 'Deleting...' : 'Delete Article'}
           </Button>
         </Col>
       </Row>

       {deleteError && <Alert variant="danger" className="mb-3">{deleteError}</Alert>}

      <Card className="border-0 shadow-sm">
        {article.image && (
          <div className="article-image-container">
            <img
              src={article.image}
              alt={article.title}
              className="article-header-image"
            />
          </div>
        )}
        <Card.Body className="p-4">
          <h1 className="mb-3">{article.title}</h1>
          <div className="mb-4">
            <small className="text-muted">
              Published on {new Date(article.createdAt).toLocaleDateString()}
            </small>
            {article.subject && article.subject.type && (
              <Badge bg="secondary" className="ms-2">
                {article.subject.type}
              </Badge>
            )}
          </div>
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