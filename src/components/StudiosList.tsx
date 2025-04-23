
import React from 'react';
import { Studio } from '../types/studio';
import { Link } from 'react-router-dom'

interface StudiosListProps {
  studios: Studio[];
  title?: string;
}

const StudiosList: React.FC<StudiosListProps> = ({ studios, }) => {
  return (
    <div>

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

export default StudiosList;
