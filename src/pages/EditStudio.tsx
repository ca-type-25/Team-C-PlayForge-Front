import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Studio } from '../types/studio';

const EditStudio: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get<Studio>(`http://localhost:3000/studios/${id}`)
      .then(res => {
        setName(res.data.name);
        setDescription(res.data.description);
        setYear(res.data.year.toString());
      })
      .catch(() => setError('Failed to fetch studio'))

      .finally(() => setLoading(false));
  }, [id]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    try {
      await axios.put(`http://localhost:3000/studios/${id}`, {
        name,
        description,
        year: Number(year),
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

  if (error) return <div style={{color: 'red'}}>{error}</div>;

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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditStudio;
