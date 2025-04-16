import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getStudioById } from '../api/studios';
import { GameStudio } from '../types/studio';

interface StudioContextProps {
  studio: GameStudio | null;
  loading: boolean;
  error: string | null;
  id: string | null;
}

export const StudioContext = createContext<StudioContextProps>({
  studio: null,
  loading: true,
  error: null,
  id: null,
});

export const StudioProvider = ({ children, id }: { children: ReactNode; id: string }) => {
  const [studio, setStudio] = useState<GameStudio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudio = async () => {
      setLoading(true);
      try {
        const response = await getStudioById(id);
        setStudio(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Error fetching studio data: ${err.message}`);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [id]);

  return (
    <StudioContext.Provider value={{ studio, loading, error, id }}>
      {children}
    </StudioContext.Provider>
  );
};
