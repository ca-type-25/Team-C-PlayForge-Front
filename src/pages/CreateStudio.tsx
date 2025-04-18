import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import api from "../api";
import { Game } from '../types/studio';
import { SelectOption } from '../types/studio';



const CreateStudio: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [selectedGames, setSelectedGames] = useState<SelectOption[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Game[]>('/games')
      .then(res => {
        setGames(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch games');
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post('/studios', {
        name,
        description,
        year: Number(year),
        games: selectedGames.map(g => g.value), 
      });
      navigate('/studios');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create studio');
      }
    }
  };

  if (loading) return <div>Loading games...</div>;

  return (
    <div className="form-container">
      <h2>Create New Studio</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Studio Name:</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Founded Year:</label>
          <input
            type="number"
            value={year}
            onChange={e => setYear(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Associated Games:</label>
          <Select
            isMulti
            options={games.map(game => ({
              value: game._id,
              label: `${game.title} (${game.release})`
            }))}
            value={selectedGames}
            onChange={(selected) => setSelectedGames(selected as SelectOption[])}
            className="react-select"
            classNamePrefix="select"
          />
        </div>

        <button type="submit" className="submit-button">
          Create Studio
        </button>
      </form>
    </div>
  );
};

export default CreateStudio;
