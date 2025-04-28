import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, ListGroup, Alert, Badge } from 'react-bootstrap';
import { useTopic } from '../../contexts/TopicContext';

const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentTopic, loading, error, fetchTopic, removeTopic } = useTopic();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTopic(id);
    }
  }, [id, fetchTopic]);

  const handleDelete = async () => {
    if (id) {
      try {
        await removeTopic(id);
        navigate('/topics');
      } catch (error) {
        console.error('Error deleting topic:', error);
      }
    }
  };

  if (loading) return <div>Loading topic...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!currentTopic) return <div>Topic not found</div>;

  return (
    <Container className="mt-4">
      <Link to="/topics" className="btn btn-outline-secondary mb-4">
        &larr; Back to Topics
      </Link>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>{currentTopic.title}</Card.Title>
          {currentTopic.context && (
            <div className="mb-2">
              <Badge bg="info">{currentTopic.context}</Badge>
            </div>
          )}
          <Card.Text>{currentTopic.description}</Card.Text>
          <div className="text-muted mb-4">
            <small>Posted by {currentTopic.user}</small>
          </div>

          <h5>Comments ({currentTopic.comments.length})</h5>
          <ListGroup>
            {currentTopic.comments.map(comment => (
              <ListGroup.Item key={comment._id}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{comment.user}</strong>
                    <p className="mb-0">{comment.content}</p>
                  </div>
                  <small className="text-muted">{comment.createdAt}</small>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="d-flex gap-2 mt-4">
            <Link to={`/topics/${id}/edit`} className="btn btn-primary">
              Edit Topic
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">Delete Topic</button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TopicPage;