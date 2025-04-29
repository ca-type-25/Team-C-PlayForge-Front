import React from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Studio } from '../../types/studio';
import api from "../../api";
import StudiosList from '../../components/StudiosList';
import { useStudios } from '../../contexts/StudioContext'; 
import { useAuth } from '../../contexts/AuthContext'

const StudioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [studio, setStudio] = React.useState<Studio | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const { studios, refreshStudios } = useStudios(); 
  const otherStudios = studios.filter(s => s._id !== id);
  const { isAdmin } = useAuth()

  React.useEffect(() => {
    if (!id) return;
    api.get<Studio>(`/studios/${id}`)
      .then(res => setStudio(res.data))
      .catch(() => setError('Failed to fetch studio'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return
    try {
      await api.delete(`/studios/${id}`);
      refreshStudios()
      navigate('/studios');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Failed to delete studio')
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!studio) return <div>No studio found.</div>


  return (
    <div style={{ padding: '20px' }}>
      <h2>{studio.name}</h2>
      <p><strong>Founded:</strong> {studio.year}</p>
      <p><strong>Description:</strong> {studio.description}</p>
      <p><strong>Created At:</strong> {new Date(studio.createdAt).toLocaleString()}</p>
      
     
      {isAdmin && (
        <div style={{ margin: '20px 0' }}>
          <Link to={`/studios/${studio._id}/edit`} style={{ marginRight: 10 }}>
            Edit Studio
          </Link>
          <button onClick={handleDelete} style={{ color: 'red' }}>
            Delete Studio
          </button>
        </div>
      )}

      <Link to="/studios">← Back to Studios</Link>

      <div style={{ marginTop: 40 }}>
        <h3>Games by {studio.name}</h3>
        {studio.games?.length > 0 ? (
          <ul>
            {studio.games.map(game => (
              <li key={game._id}>
                <Link to={`/games/${game._id}`}>
                  {game.title} ({game.release})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No games listed yet.</p>
        )}
      </div>

      <div style={{ marginTop: 40 }}>
        <h3>Other Studios</h3>
        <StudiosList studios={otherStudios} />
      </div>
    </div>
  );
};

export default StudioDetail;
