
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { getAllArticles } from '../../api/articlesApi';
import { useArticle } from '../../contexts/ArticleContext';


interface ArticlesListProps {
  hideCreateNew?: boolean; 
}

const ArticlesList: React.FC<ArticlesListProps> = ({ hideCreateNew }) => {
  const { articles, setArticles, isLoading, setIsLoading, error, setError } = useArticle();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const articlesData = await getAllArticles();
        setArticles(articlesData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch articles');
        setArticles([]);
        console.error('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
    
    return () => {
      setArticles([]);
      setError(null);
    };
  }, [setArticles, setError, setIsLoading]);

  if (isLoading) {
    return <div className="text-center mt-5">Loading articles...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Articles</h1>
        {!hideCreateNew && ( 
          <Link to="/articles/create" className="btn btn-primary">
            Create New Article
          </Link>
        )}
      </div>

      <Row>
        {articles.length === 0 ? (
          <Col>
            <Card className="text-center p-5">
              <Card.Body>
                <h3>No articles found</h3>
                <p>Be the first to create an article!</p>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          articles.map(article => (
            <Col key={article._id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                {article.image && (
                  <Card.Img 
                    variant="top" 
                    src={article.image} 
                    alt={article.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>
                    {article.content.length > 100 
                      ? `${article.content.substring(0, 100)}...` 
                      : article.content}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <small className="text-muted">
                    Published on {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Unknown date'}
                  </small>
                  <Link 
                    to={`/articles/${article._id}`} 
                    className="btn btn-sm btn-outline-primary float-end"
                  >
                    Read More
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default ArticlesList;