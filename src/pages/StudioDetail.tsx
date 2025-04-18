import React from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Studio } from '../types/studio';
import api from "../api";

const StudioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [studio, setStudio] = React.useState<Studio | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!id) return;

    api.get<Studio>(`/studios/${id}`)
      .then(res => setStudio(res.data))
      .catch(() => setError('Failed to fetch studio'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this studio?')) return;
    try {
      await api.delete(`/studios/${id}`);

      navigate('/studios'); 

    } catch (err: unknown) {

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);

      } else {
        setError('Failed to delete studio');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!studio) return <div>No studio found.</div>;

  return (
    <div>
      <h2>{studio.name}</h2>

      <p>Founded: {studio.year}</p>
      <p>Description: {studio.description}</p>
      <p>Created At:{new Date(studio.createdAt).toLocaleString()}</p>
      <Link to={`/studios/${studio._id}/edit`}>Edit Studio</Link>
      <button onClick={handleDelete} style={{ marginLeft: 16, color: 'red' }}>
        Delete Studio
      </button>
      <br />
      <Link to="/studios">Back to Studios</Link>
    </div>
  );
};

export default StudioDetail;
