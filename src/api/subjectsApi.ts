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

export const createSubject = async (subjectData: Omit<Subject, '_id'>) => {
  try {
    console.log('Sending subject data:', JSON.stringify(subjectData));
    
    // For development: Skip authentication check
    // In production, you would use this code instead:
    // const token = localStorage.getItem('authToken');
    // if (!token) {
    //   throw new Error('Authentication token is missing. Please log in again.');
    // }
    
    // Development mode - send request without authentication
    const response = await axios.post(`${API_BASE_URL}/subjects`, subjectData, {
      headers: {
        'Content-Type': 'application/json'
        // Authentication header removed for development
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating subject:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server response:', error.response.data);
      throw new Error(`Failed to create subject: ${error.response.data.message || error.message}`);
    }
    throw error;
  }
};

export const updateSubject = async (id: string, subjectData: Partial<Omit<Subject, '_id'>>) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/subjects/${id}`, subjectData);
    return response.data;
  } catch (error) {
    console.error(`Error updating subject with ID ${id}:`, error);
    throw error;
  }
};

export const deleteSubject = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/subjects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting subject with ID ${id}:`, error);
    throw error;
  }
};