import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, ListGroup, Alert } from 'react-bootstrap';
import { deleteTopic, getTopicById } from '../../api/topicsApi'; // Import the delete function

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

const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchTopic = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const topicData = await getTopicById(id);
        console.log('Fetched topic data:', topicData); // Add this for debugging
        setTopic(topicData);
      } catch (error) {
        console.error('Error fetching topic:', error);
        setError('Failed to fetch topic details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopic();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteTopic(id);
        navigate('/topics'); // Redirect to topics list after deletion
      } catch (error) {
        console.error('Error deleting topic:', error);
      }
    }
  };

  if (loading) return <div>Loading topic...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>; // Display error if present
  if (!topic) return <div>Topic not found</div>;

  return (
    <Container className="mt-4">
      <Link to="/topics" className="btn btn-outline-secondary mb-4">
        &larr; Back to Topics
      </Link>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>{topic.title}</Card.Title>
          <Card.Text>{topic.description}</Card.Text>
          <div className="text-muted mb-4">
            <small>Posted by {topic.user}</small>
          </div>

          <h5>Comments ({topic.comments.length})</h5>
          <ListGroup>
            {topic.comments.map(comment => (
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