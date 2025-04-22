
import React from 'react';
import StudiosList from '../../components/StudiosList';
import { useStudios } from '../../contexts/StudioContext';
import { Link } from 'react-router-dom';

const GameStudios: React.FC = () => {
  const { studios } = useStudios();

  return (
    <div>
      <h2>Game Studios</h2>
      <div style={{ marginBottom: 16 }}>
        <Link to="/studios/create">
          <button>Create Studio</button>
        </Link>
      </div>
      <StudiosList studios={studios} />
    </div>
  );
};

export default GameStudios;
