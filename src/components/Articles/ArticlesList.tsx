import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';

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
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch articles');
        setLoading(false);
        console.error('Error fetching articles:', err);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading articles...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Latest Articles</h1>
      <Row>
        {articles.map((article) => (
          <Col md={4} className="mb-4" key={article._id}>
            <Card className="article-card h-100">
              {article.image && (
                <Card.Img 
                  variant="top" 
                  src={article.image} 
                  alt={article.title}
                  className="article-image" 
                />
              )}
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                  {article.content.substring(0, 150)}...
                </Card.Text>
                {article.subject && article.subject.type && (
                  <Badge bg="secondary" className="me-2">
                    {article.subject.type}
                  </Badge>
                )}
                <div className="mt-3">
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