import api from '../api'; 
import { Studio } from '../types/studio';

export const getStudios = async () => {
  const res = await api.get<Studio[]>('/studios');
  return res.data;
};

export const getStudioById = async (id: string) => {
  const res = await api.get<Studio>(`/studios/${id}`);
  return res.data;
};

export const createStudio = async (studio: Partial<Studio>) => {
  const res = await api.post<Studio>('/studios', studio);
  return res.data;
};

export const updateStudio = async (id: string, studio: Partial<Studio>) => {
  const res = await api.put<Studio>(`/studios/${id}`, studio);
  return res.data;
};

export const deleteStudio = async (id: string) => {
  await api.delete(`/studios/${id}`);
};
