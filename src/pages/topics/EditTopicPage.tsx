import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { getTopicById, updateTopic } from '../../api/topicsApi';

interface Comment {
  _id: string;
  content: string;
  user: string;
  createdAt: string;
}
// eslint-disable-next-line
interface Topic {
  _id: string;
  title: string;
  description: string;
  user: string;
  comments: Comment[];
}

const EditTopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const topicData = await getTopicById(id);
        if (topicData) {
          setTitle(topicData.title);
          setDescription(topicData.description);
        } else {
          setError('Topic not found');
        }
      } catch (error) {
        console.error('Error fetching topic:', error);
        setError('Failed to fetch topic details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopic();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      setSubmitting(false);
      return;
    }
    
    try {
      await updateTopic(id!, { title, description });
      setSuccess('Topic updated successfully!');
      setTimeout(() => navigate(`/topics/${id}`), 1500);
    } catch (error) {
      console.error('Error updating topic:', error);
      setError('Failed to update topic. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading topic...</div>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header as="h2">Edit Topic</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTopicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter topic title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formTopicDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter topic description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate(`/topics/${id}`)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Updating...' : 'Update Topic'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditTopicPage;