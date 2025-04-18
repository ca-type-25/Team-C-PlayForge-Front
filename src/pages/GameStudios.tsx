
import React, { useEffect, useState } from 'react';

import { Studio } from '../types/studio';
import { Link } from 'react-router-dom';
import api from "../api";

const GameStudios: React.FC = () => {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Studio[]>('/studios')
      .then(res => setStudios(res.data))
      .catch(() => setError('Failed to fetch studios'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Game Studios</h1>
      <Link to="/studios/create">Create New Studio</Link>
      <ul>
        {studios.map(studio => (
          <li key={studio._id}>
            <Link to={`/studios/${studio._id}`}>
              <strong>{studio.name}</strong>
            </Link> ({studio.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameStudios;
