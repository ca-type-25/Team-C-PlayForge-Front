import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { Subject, getSubjectById } from '../../api/subjectsApi';

const SubjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubject = async () => {
      if (!id) {
        setError('Subject ID is missing');
        setLoading(false);
        return;
      }

      try {
        const data = await getSubjectById(id);
        setSubject(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch subject');
        setLoading(false);
        console.error('Error fetching subject:', err);
      }
    };

    fetchSubject();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading subject...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (!subject) {
    return <div className="text-center mt-5">Subject not found.</div>;
  }

  return (
    <Container className="mt-4">
      <Link to="/subjects" className="btn btn-outline-secondary mb-4">
        &larr; Back to Subjects
      </Link>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <h1 className="mb-0">{subject.title}</h1>
            <Link
              to={`/subjects/${subject._id}/edit`}
              className="btn btn-outline-primary"
            >
              Edit Subject
            </Link>
          </div>
          <div className="subject-description mt-4">
            <p>{subject.description}</p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SubjectPage;