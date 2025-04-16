import { GameStudio } from '../types/studio';

export const getStudioById = async (id: string): Promise<{ data: GameStudio }> => {
  const response = await fetch(`/api/studios/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch studio');
  }

  const data = await response.json();
  return { data };
};
