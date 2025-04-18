import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import api from "../api";
import { Studio } from '../types/studio';
import { Game } from '../types/studio';
import { SelectOption } from '../types/studio';





const EditStudio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [selectedGames, setSelectedGames] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesRes, studioRes] = await Promise.all([
          api.get<Game[]>('/games'),
          api.get<Studio>(`/studios/${id}`)
        ]);
        setAllGames(gamesRes.data);
        setName(studioRes.data.name);
        setDescription(studioRes.data.description);
        setYear(studioRes.data.year.toString());

        const studioGames = Array.isArray(studioRes.data.games)
          ? studioRes.data.games.map((g: string | Game) =>
              typeof g === 'string'
                ? { value: g, label: gamesRes.data.find(game => game._id === g)?.title || g }
                : { value: g._id, label: `${g.title} (${g.release})` }
            )
          : [];
        setSelectedGames(studioGames);
      } catch {
        setError('Failed to fetch studio or games');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.put(`/studios/${id}`, {
        name,
        description,
        year: Number(year),
        games: selectedGames.map(g => g.value),
      });
      navigate(`/studios/${id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update studio');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Edit Studio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: <input value={name} onChange={e => setName(e.target.value)} required /></label>
        </div>
        <div>
          <label>Description: <textarea value={description} onChange={e => setDescription(e.target.value)} required /></label>
        </div>
        <div>
          <label>Year: <input type="number" value={year} onChange={e => setYear(e.target.value)} required /></label>
        </div>
        <div>
          <label>Games:</label>
          <Select
            isMulti
            options={allGames.map(game => ({
              value: game._id,
              label: `${game.title} (${game.release})`
            }))}
            value={selectedGames}
            onChange={selected => setSelectedGames(selected as SelectOption[])}
            className="react-select"
            classNamePrefix="select"
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditStudio;
