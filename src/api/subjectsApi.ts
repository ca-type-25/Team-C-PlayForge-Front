import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface Subject {
  _id: string;
  title: string;
  description: string;
}

export const getAllSubjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects`);
    return response.data.map((subject: Partial<Subject>) => ({
      _id: subject._id || '',
      title: subject.title || 'Unknown',
      description: subject.description || ''
    }));
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [
      { _id: 'subject1', title: 'Minecraft', description: 'Popular sandbox game' },
      { _id: 'subject2', title: 'Game Studio', description: 'Game development company' },
      { _id: 'subject3', title: 'RPG', description: 'Role-playing game genre' },
      { _id: 'subject4', title: 'Call of Duty', description: 'First-person shooter series' }
    ];
  }
};


export const getSubjectById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects/${id}`);
    const subject = response.data;
    return {
      _id: subject._id,
      title: subject.title || 'Unknown',
      description: subject.description || ''
    };
  } catch (error) {
    console.error(`Error fetching subject with ID ${id}:`, error);
    return { _id: id, title: `Subject ${id}`, description: 'No description available' };
  }
};