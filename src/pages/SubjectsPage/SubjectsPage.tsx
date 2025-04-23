import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Subject, getAllSubjects } from '../../api/subjectsApi';

const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getAllSubjects();
        setSubjects(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch subjects');
        setLoading(false);
        console.error('Error fetching subjects:', err);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading subjects...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Subjects</h1>
        <Link to="/subjects/create" className="btn btn-primary">
          Create Subject
        </Link>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {subjects.map((subject) => (
          <Col key={subject._id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{subject.title}</Card.Title>
                <Card.Text>{subject.description}</Card.Text>
                <Link 
                  to={`/subjects/${subject._id}`} 
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SubjectsPage;