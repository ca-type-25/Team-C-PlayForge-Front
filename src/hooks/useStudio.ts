import { useContext } from 'react';
import { StudioContext } from '../context/StudioContext';
import { GameStudio } from '../types/studio';

interface UseStudioResult {
  studio: GameStudio | null;
  loading: boolean;
  error: string | null;
  id: string | null;
}

export const useStudio = (): UseStudioResult => {
  const context = useContext(StudioContext);

  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }

  return context; // Return the entire context (studio, loading, error, id)
};
