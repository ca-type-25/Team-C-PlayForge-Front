import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getAllArticles } from '../../api/articlesApi';


interface Article {
  _id: string;
  title: string;
  content: string;
  image?: string;
  video?: string;
  createdAt: string;
  updatedAt: string;
}

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData = await getAllArticles();
        console.log("Fetched articles data:", articlesData);
        
      
        articlesData.forEach((article: Article) => {
          if (typeof article._id !== 'string' || article._id.length !== 24 || !/^[0-9a-fA-F]+$/.test(article._id)) {
            console.warn(`Invalid _id found: ${article._id} for article titled: ${article.title}`);
          }
        });
        
        setArticles(articlesData);
      } catch (err) {
        setError('Failed to fetch articles');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading articles...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Articles</h1>
        <Link to="/articles/create" className="btn btn-primary">
          Create New Article
        </Link>
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
                    Published on {new Date(article.createdAt).toLocaleDateString()}
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