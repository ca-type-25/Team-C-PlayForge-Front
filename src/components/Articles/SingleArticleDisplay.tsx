import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { getArticleById } from '../../api/articlesApi';
import { useArticle } from '../../contexts/ArticleContext';




const SingleArticleDisplay: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { article, setArticle, isLoading, setIsLoading, error, setError } = useArticle();

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

    fetchArticle();
    
    return () => {
      setArticle(null);
      setError(null);
    };
  }, [id, setArticle, setError, setIsLoading]);

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
          <h1 className="mb-3">{article.title}</h1>
          
          <div className="mb-4">
            <small className="text-muted">
              Published on {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Unknown date'}
            </small>
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