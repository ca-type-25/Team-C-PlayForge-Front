import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';


interface ArticleFormData {
  title: string;
  content: string;
  image?: string;
  video?: string;
}

const EditArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    image: '',
    video: '',
  });
  const [loading, setLoading] = useState<boolean>(false); 
  const [initialLoading, setInitialLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


 
  useEffect(() => {
    if (!id) {
        setError("Article ID is missing.");
        setInitialLoading(false);
        return;
    };

    const fetchArticleData = async () => {
      setInitialLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/articles/${id}`);
        const { title, content, image, video /*, subject, user */ } = response.data;
        setFormData({
          title,
          content,
          image: image || '',
          video: video || '',
        });
      } catch (err) {
        console.error("Failed to fetch article data for editing", err);
        setError("Failed to load article data. Please try again.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchArticleData();
  }, [id]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    
    const articleDataToUpdate = {
        title: formData.title,
        content: formData.content,
        video: formData.video || undefined,
        image: formData.image || undefined,
    };

    try {
      await axios.put(`http://localhost:3000/articles/${id}`, articleDataToUpdate, {
      });

      setSuccess('Article updated successfully!');
      setTimeout(() => navigate(`/articles/${id}`), 1500);

    } catch (err) {
      console.error('Error updating article:', err);
      let message = 'Failed to update article. Please try again.';
       if (axios.isAxiosError(err)) {
           message = err.response?.data?.message || err.message;
       } else if (err instanceof Error) {
           message = err.message;
       }
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