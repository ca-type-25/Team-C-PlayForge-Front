import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { createArticle } from '../../../api/articlesApi';
import { getUsers } from '../../../api/users';
import { User } from '../../../types/users';
import { getAllSubjects, Subject } from '../../../api/subjectsApi';
import Form from 'react-bootstrap/Form';
import './CreateArticlePage.css';


interface ArticleInput {
  title: string;
  content: string;
  video?: string;
  image?: string;
  users: string[];
  subjects: string[];
}




const CreateArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ArticleInput>({
    title: '',
    content: '',
    video: '',
    image: '',
    users: [],
    subjects: []
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try fetching subjects first
        const subjectsData = await getAllSubjects();
        if (Array.isArray(subjectsData)) {
          setAvailableSubjects(subjectsData);
        }
        
        try {
          // Check if token exists before making the request
          const token = localStorage.getItem('token');
          if (!token) {
            console.warn("No authentication token found. User data may be restricted.");
            // Consider setting a message for the user that they need to log in
            setAvailableUsers([]);
            return; // Skip the API call if no token
          }
          
          // Log token format (first few characters) for debugging
          console.log("Token format check:", token.substring(0, 20) + "...");
          
          try {
            const response = await getUsers();
            if (response && response.data && Array.isArray(response.data)) {
              setAvailableUsers(response.data);
            } else {
              console.warn("Users data format unexpected:", response);
              setAvailableUsers([]);
            }
          } catch (userErr) {
            console.error("Failed to fetch users:", userErr);
            // Make the form usable even without user data
            setAvailableUsers([]);
            
            // Check if this is an authentication error
            if ((userErr as { response?: { status: number } }).response?.status === 401 || (userErr as { response?: { status: number } }).response?.status === 403) {
              console.warn("Authentication issue - user may need to log in");
            }
          }
        } catch (userErr) {
          console.error("Failed to fetch users:", userErr);
          // Don't set error state for the whole form, just log it
          // The form can still work without user data
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load some data. You can still create an article with available options.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const selectedOptions = Array.from(
      e.target.selectedOptions, 
      option => option.value
    );
    setFormData(prev => ({ ...prev, [name]: selectedOptions }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to create an article. Please log in and try again.');
      setLoading(false);
      return;
    }
  
    if (!formData.title || !formData.content) {
      setError('Title and Content are required.');
      setLoading(false);
      return;
    }


    const articleDataToSend = {
      title: formData.title,
      content: formData.content,
     
      ...(formData.video && formData.video.trim() !== '' ? { video: formData.video } : {}),
      ...(formData.image && formData.image.trim() !== '' ? { image: formData.image } : {}),
      
      ...(formData.users.length > 0 ? { users: formData.users } : {}),
      ...(formData.subjects.length > 0 ? { subjects: formData.subjects } : {})
    };

    try {
      await createArticle(articleDataToSend);

      setSuccess('Article created successfully!');
      setFormData({ 
        title: '', 
        content: '', 
        video: '', 
        image: '', 
        users: [], 
        subjects: [] 
      });
      setTimeout(() => navigate('/articles'), 1500);

    } catch (err) {
      console.error('Error creating article:', err);
      
      // Check for authentication errors specifically
      if ((err as { response?: { status: number } }).response?.status === 401) {
        setError('Authentication failed. Please log in again and try creating the article.');
        // Optionally redirect to login page
        // setTimeout(() => navigate('/login'), 1500);
      } else {
        setError('Failed to create article. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container className="create-article-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="create-article-card">
            <Card.Header as="h2" className="create-article-header">Create New Article</Card.Header>
            <Card.Body className="create-article-body">
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formArticleTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter article title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formArticleContent">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Write your article content here..."
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formArticleImage">
                  <Form.Label>Image URL (Optional)</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formArticleVideo">
                  <Form.Label>Video URL (Optional - e.g., YouTube embed link)</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://www.youtube.com/embed/your_video_id"
                    name="video"
                    value={formData.video}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* New form groups for users and subjects */}
                <Form.Group className="mb-3" controlId="formArticleUsers">
                  <Form.Label>Users</Form.Label>
                  <Form.Select
                    multiple
                    name="users"
                    value={formData.users}
                    onChange={handleMultiSelectChange}
                    className="custom-select"
                  >
                    {availableUsers.length > 0 ? (
                      availableUsers.map(user => (
                        <option key={user._id} value={user._id}>
                          {user.name || `User ${user._id?.substring(0, 6) || 'Unknown'}`}
                        </option>
                      ))
                    ) : (
                      <option disabled>No users available</option>
                    )}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Hold Ctrl (or Cmd on Mac) to select multiple users
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formArticleSubjects">
                  <Form.Label>Subjects</Form.Label>
                  <Form.Select
                    multiple
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleMultiSelectChange}
                    className="custom-select"
                  >
                    {availableSubjects.length > 0 ? (
                      availableSubjects.map(subject => (
                        <option key={subject._id} value={subject._id}>
                          {subject.title} 
                        </option>
                      ))
                    ) : (
                      <option disabled>No subjects available</option>
                    )}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Hold Ctrl (or Cmd on Mac) to select multiple subjects
                  </Form.Text>
                </Form.Group>

                <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="submit-button"
              >
                {loading ? 'Creating...' : 'Create Article'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
};

export default CreateArticlePage;