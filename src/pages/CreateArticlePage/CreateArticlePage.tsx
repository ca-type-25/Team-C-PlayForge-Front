import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';


interface SubjectInput {
  id?: string; 
  type: 'Game' | 'Studio' | 'Genre' | ''; 
}

interface ArticleInput {
  title: string;
  content: string;
  video?: string;
  image?: string;
  user?: string; 
  subject?: SubjectInput;
}

const CreateArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ArticleInput>({
    title: '',
    content: '',
    video: '',
    image: '',
    user: '',
    subject: { type: '' } 
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        video: formData.video || undefined, 
        image: formData.image || undefined, 
        user: formData.user || undefined   
    };


    try {
      // Send the filtered data
      await axios.post('http://localhost:3000/articles', articleDataToSend, {
      });

      setSuccess('Article created successfully!');
      setFormData({ title: '', content: '', video: '', image: '', user: '', subject: { type: '' } });
      setTimeout(() => navigate('/articles'), 1500);

    } catch (err) {
      console.error('Error creating article:', err);
      setError('Failed to create article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h2">Create New Article</Card.Header>
            <Card.Body>
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


                <Button variant="primary" type="submit" disabled={loading}>
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