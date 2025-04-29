 
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllTopics } from '../../api/topicsApi'; // Import the API function

interface Topic {
  _id: string;
  title: string;
  description: string;
  user: string;
  comments: Comment[];
}

interface Comment {
  _id: string;
  content: string;
  user: string;
  createdAt: string;
}

const TopicsPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsData = await getAllTopics();
        console.log('Fetched topics:', topicsData); // For debugging
        setTopics(topicsData);
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError('Failed to fetch topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return <div>Loading topics...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Topics</h1>
        <Link to="/topics/create" className="btn btn-primary">
          Create Topic
        </Link>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {topics.length === 0 ? (
          <Col>
            <Card className="text-center p-5">
              <Card.Body>
                <h3>No topics found</h3>
                <p>Be the first to create a topic!</p>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          topics.map(topic => (
            <Col key={topic._id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{topic.title}</Card.Title>
                  <Card.Text>{topic.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <small>By {topic.user}</small>
                    <Link 
                      to={`/topics/${topic._id}`} 
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Discussion
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default TopicsPage;