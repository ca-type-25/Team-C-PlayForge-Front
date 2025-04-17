import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Alert, Card, Row, Col, Spinner } from 'react-bootstrap';


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


interface Article extends ArticleInput {
    _id: string;
    createdAt: string;
    updatedAt: string;
}


const EditArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
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
  const [pageLoading, setPageLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  useEffect(() => {
    const fetchArticle = async () => {
      setPageLoading(true);
      setError(null);
      try {
        const response = await axios.get<Article>(`http://localhost:3000/articles/${id}`);
        const article = response.data;
        setFormData({
          title: article.title,
          content: article.content,
          video: article.video || '', 
          image: article.image || '',
          user: article.user || '', 
          subject: article.subject ? { id: article.subject.id, type: article.subject.type } : { type: '' } 
        });
      } catch (err) {
        console.error('Error fetching article for edit:', err);
        setError('Failed to load article data. Please try again.');
      } finally {
        setPageLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    } else {
        setError('Article ID not found.'); 
        setPageLoading(false);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setError(null); 
    setSuccess(null); 

    if (name === 'subjectType') {
      setFormData(prev => ({
        ...prev,
        subject: { ...(prev.subject || {}), type: value as SubjectInput['type'], id: value ? prev.subject?.id : '' } 
      }));
    } else if (name === 'subjectId') {
        setFormData(prev => ({
            ...prev,
            subject: {
                ...(prev.subject || { type: '' }),
                id: value
            }
        }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
    if (formData.subject?.type && !formData.subject?.id) {
        setError('Subject ID is required if Subject Type is selected.');
        setLoading(false);
        return;
    }
    if (!formData.subject?.type && formData.subject?.id) {
        setError('Subject Type is required if Subject ID is provided.');
        setLoading(false);
        return;
    }

    const articleData: Partial<ArticleInput> = { ...formData };
    if (!articleData.video) delete articleData.video;
    if (!articleData.image) delete articleData.image;
    if (!articleData.subject?.type || !articleData.subject?.id) {
        delete articleData.subject;
    } else {
        articleData.subject = { id: articleData.subject.id, type: articleData.subject.type };
    }


    try {
      await axios.put(`http://localhost:3000/articles/${id}`, articleData, {
      });

      setSuccess('Article updated successfully!');
      setTimeout(() => navigate(`/articles/${id}`), 1500); 

    } catch (err) {
      console.error('Error updating article:', err);
      setError('Failed to update article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading article...</span>
        </Spinner>
      </Container>
    );
  }


  if (error && !success) { 
      return (
          <Container className="mt-4">
              <Alert variant="danger">{error}</Alert>
          </Container>
      )
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

                 <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formArticleSubjectType">
                        <Form.Label>Subject Type (Optional)</Form.Label>
                        <Form.Select
                            name="subjectType"
                            value={formData.subject?.type || ''} 
                            onChange={handleChange}
                        >
                            <option value="">Select Type...</option>
                            <option value="Game">Game</option>
                            <option value="Studio">Studio</option>
                            <option value="Genre">Genre</option>
                        </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formArticleSubjectId">
                        <Form.Label>Subject ID (Required if Type selected)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Subject ID (e.g., game ID)"
                            name="subjectId"
                            value={formData.subject?.id || ''}
                            onChange={handleChange}
                            disabled={!formData.subject?.type}
                        />
                        </Form.Group>
                    </Col>
                 </Row>

                <Form.Group className="mb-3" controlId="formArticleUser">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter user ID"
                    name="user" 
                    value={formData.user} 
                    onChange={handleChange} 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading || pageLoading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                 <Button variant="secondary" onClick={() => navigate(`/articles/${id}`)} className="ms-2" disabled={loading || pageLoading}>
                    Cancel
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