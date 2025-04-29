import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTopic } from '../../api/topicsApi';
import { getAllUsers   } from '../../api/usersApi'; // Import the users API function instead of axios
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

// Add the Comment interface to match the expected type
interface Comment {
  _id: string;
  content: string;
  user: string;
  createdAt: string;
}

interface User {
  _id: string;
  username: string;
  email?: string;
}

// Remove unused API_BASE_URL constant

const CreateTopicPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Fetch users when component mounts
    const fetchUsers = async () => {
      try {
        // Use the getUsersApi function instead of direct api call
        const response = await getAllUsers();
        // Check if response.data exists before accessing its properties
        if (response && response.data) {
          setUsers(response.data);
          if (response.data.length > 0) {
            setUser(response.data[0]._id); // Set default user to first user
          }
        } else {
          // Handle case when response.data is undefined
          setUsers([]);
          setError('No users data available');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
      // Filter out any empty comments before submitting
      const validComments = comments.filter(comment => comment.content.trim() !== '');
      
      // Create the topic with valid comments
      await createTopic({ 
        title, 
        description, 
        user, 
        comments: validComments 
      });
      
      setSuccess('Topic created successfully!');
      setTimeout(() => navigate('/topics'), 1500);
    } catch (error) {
      console.error('Error creating topic:', error);
      setError('Failed to create topic. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to add a new comment
  const addComment = () => {
    const newComment: Comment = {
      _id: Date.now().toString(), // Generate a temporary ID
      content: '',
      user: users.length > 0 ? users[0]._id : '',
      createdAt: new Date().toISOString()
    };
    setComments([...comments, newComment]);
  };

  // Helper function to update a comment
  const updateComment = (index: number, field: keyof Comment, value: string) => {
    const updatedComments = [...comments];
    updatedComments[index] = {
      ...updatedComments[index],
      [field]: value
    };
    setComments(updatedComments);
  };
  
  // Helper function to remove a comment
  const removeComment = (index: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  if (loading) return <div className="text-center mt-5">Loading users...</div>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header as="h2">Create New Topic</Card.Header>
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
                
                <Form.Group className="mb-3" controlId="formTopicUser">
                  <Form.Label>User</Form.Label>
                  <Form.Select
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  >
                    {/* Add null check before mapping users */}
                    {users && users.length > 0 ? users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.username || user.email || user._id}
                      </option>
                    )) : (
                      <option value="">No users available</option>
                    )}
                  </Form.Select>
                </Form.Group>
                
                {/* Comments section */}
                <Form.Group className="mb-3">
                  <Form.Label>Comments (Optional)</Form.Label>
                  {comments.map((comment, index) => (
                    <div key={comment._id} className="d-flex mb-2 gap-2 align-items-center">
                      <Form.Control
                        placeholder="Comment content"
                        value={comment.content}
                        onChange={(e) => updateComment(index, 'content', e.target.value)}
                        className="flex-grow-1"
                      />
                      <Form.Select
                        value={comment.user}
                        onChange={(e) => updateComment(index, 'user', e.target.value)}
                        style={{ width: '180px' }}
                      >
                        <option value="">Select User</option>
                        {/* Add null check before mapping users */}
                        {users && users.length > 0 ? users.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.username || user.email || user._id}
                          </option>
                        )) : null}
                      </Form.Select>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeComment(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    onClick={addComment} 
                    className="mt-2"
                  >
                    Add Comment
                  </Button>
                </Form.Group>
                
                <div className="d-flex justify-content-between mt-4">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/topics')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={submitting}
                  >
                    {submitting ? 'Creating...' : 'Create Topic'}
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

export default CreateTopicPage;