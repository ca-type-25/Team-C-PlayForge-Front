
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from "../api";

const CreateStudio: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {

      await api.post('/studios', {
        name,
        description,
        year: Number(year),
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

  return (

    <div>
      <h2>Create New Studio</h2>

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

        <button type="submit">Create</button>
        {error && <div style={{color: 'red'}}>{error}</div>}
      </form>
    </div>
  );
};


export default CreateStudio;
