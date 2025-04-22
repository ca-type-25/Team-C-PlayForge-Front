import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import { getArticleById, updateArticle } from '../../api/articlesApi';
import { getAllUsers, User } from '../../api/usersApi';
import { getAllSubjects, Subject } from '../../api/subjectsApi';

interface ArticleFormData {
  title: string;
  content: string;
  image?: string;
  video?: string;
  users: string[];
  subjects: string[];
}

const EditArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    image: '',
    video: '',
    users: [],
    subjects: []
  });
  const [loading, setLoading] = useState<boolean>(false); 
  const [initialLoading, setInitialLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    if (!id) {
        setError("Article ID is missing.");
        setInitialLoading(false);
        return;
    };

    const fetchData = async () => {
      setInitialLoading(true);
      setError(null);
      try {
        // Fetch article, users, and subjects data in parallel
        const [articleData, usersData, subjectsData] = await Promise.all([
          getArticleById(id),
          getAllUsers(),
          getAllSubjects()
        ]);
        
        const { title, content, image, video, users, subjects } = articleData;
        
        setFormData({
          title,
          content,
          image: image || '',
          video: video || '',
          users: users || [],
          subjects: subjects || []
        });
        
        setAvailableUsers(usersData);
        setAvailableSubjects(subjectsData);
      } catch (err) {
        console.error("Failed to fetch data for editing", err);
        setError("Failed to load necessary data. Please try again.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
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

    const articleDataToUpdate = {
        title: formData.title,
        content: formData.content,
        video: formData.video || undefined,
        image: formData.image || undefined,
        users: formData.users.length > 0 ? formData.users : undefined,
        subjects: formData.subjects.length > 0 ? formData.subjects : undefined,
    };

 
    try {
      await updateArticle(id!, articleDataToUpdate);
    
      setSuccess('Article updated successfully!');
      setTimeout(() => navigate(`/articles/${id}`), 1500);
    
    } catch (err) {
      console.error('Error updating article:', err);
      const message = 'Failed to update article. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
      return <div className="text-center mt-5">Loading article data...</div>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h2">Edit Article</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formArticleTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
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
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formArticleVideo">
                  <Form.Label>Video URL (Optional)</Form.Label>
                  <Form.Control
                    type="url"
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
                  >
                    {availableUsers.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.username}
                      </option>
                    ))}
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
                  >
                    {availableSubjects.map(subject => (
                      <option key={subject._id} value={subject._id}>
                        {subject.title} ({subject.description})
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Hold Ctrl (or Cmd on Mac) to select multiple subjects
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading || initialLoading}>
                  {loading ? 'Updating...' : 'Update Article'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditArticlePage;