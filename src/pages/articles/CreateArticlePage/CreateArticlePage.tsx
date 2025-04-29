import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { createArticle } from '../../../api/articlesApi';
import { getAllUsers, User } from '../../../api/usersApi';
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
       
        const [usersData, subjectsData] = await Promise.all([
          getAllUsers(),
          getAllSubjects()
        ]);
        
        
        if (Array.isArray(usersData)) {
          setAvailableUsers(usersData);
        }
        
        if (Array.isArray(subjectsData)) {
          setAvailableSubjects(subjectsData);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load users and subjects data. You can still create an article without selecting users or subjects.");
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
      setError('Failed to create article. Please try again.');
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
                          {user.username || `User ${user._id.substring(0, 6)}`}
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