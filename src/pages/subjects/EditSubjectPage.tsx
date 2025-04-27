import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { updateSubject, getSubjectById, Subject } from '../../api/subjectsApi';

const EditSubjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubject = async () => {
      if (!id) {
        setError('Subject ID is missing');
        setLoading(false);
        return;
      }

      try {
        const fetchedSubject = await getSubjectById(id);
        setSubject(fetchedSubject);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch subject');
        setLoading(false);
        console.error('Error fetching subject:', err);
      }
    };

    fetchSubject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !subject) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await updateSubject(id, {
        title: subject.title,
        description: subject.description
      });
      navigate(`/subjects/${id}`);
    } catch (err) {
      setError('Failed to update subject. Please try again.');
      console.error('Error updating subject:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading subject...</div>;
  }

  if (error && !isSubmitting) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (!subject) {
    return <div className="text-center mt-5">Subject not found.</div>;
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h1 className="mb-4">Edit Subject</h1>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={subject.title}
                onChange={(e) => setSubject({ ...subject, title: e.target.value })}
                required
                placeholder="Enter subject title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={subject.description}
                onChange={(e) => setSubject({ ...subject, description: e.target.value })}
                required
                placeholder="Enter subject description"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => navigate(`/subject/${id}`)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditSubjectPage;