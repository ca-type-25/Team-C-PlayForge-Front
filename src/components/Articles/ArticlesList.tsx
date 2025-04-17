import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap'; 
import './ArticlesList.css';

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

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<Article[]>('http://localhost:3000/articles');
        console.log("Fetched articles data:", response.data); 
        response.data.forEach(article => {
            if (typeof article._id !== 'string' || article._id.length !== 24 || !/^[0-9a-fA-F]+$/.test(article._id)) {
                console.warn(`Invalid _id found: ${article._id} for article titled: ${article.title}`);
            }
        });
        setArticles(response.data);
      } catch (err) {
        setError('Failed to fetch articles');
        console.error('Error fetching articles:', err);
      } finally {
          setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading articles...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container className="mt-4 articles-list-container">
      <h1 className="mb-4 text-center">Latest Articles</h1>

      <div className="text-end mb-3 create-article-link"> 
        <Link to="/articles/create" className="btn btn-success">
          + Create New Article
        </Link>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4"> 
        {articles.map((article) => (
          <Col key={article._id}> 
            <Card className="article-card h-100">
              {article.image && (
                <Card.Img 
                  variant="top" 
                  src={article.image} 
                  alt={article.title}
                  className="article-image" 
                />
              )}
              <Card.Body className="d-flex flex-column"> 
                <div> 
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text className="article-card-text"> 
                    {article.content.substring(0, 100)}... 
                  </Card.Text>
                  {article.subject && article.subject.type && (
                    <Badge bg="secondary" className="me-2 mb-2"> 
                      {article.subject.type}
                    </Badge>
                  )}
                </div>
                <div className="mt-auto"> 
                  <Link to={`/articles/${article._id}`} className="btn btn-primary btn-sm">
                    Read More
                  </Link>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                {new Date(article.createdAt).toLocaleDateString()}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ArticlesList;