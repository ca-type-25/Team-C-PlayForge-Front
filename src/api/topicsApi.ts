import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface Topic {
  _id: string;
  title: string;
  description: string;
  user: string;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  content: string;
  user: string;
  createdAt: string;
}

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getAllTopics = async () => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      console.error('No authentication token found');
      return [];
    }
    
    const response = await axios.get(`${API_BASE_URL}/topics`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};

export const getTopicById = async (id: string) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      console.error('No authentication token found');
      return [];
    }
    
    const response = await axios.get(`${API_BASE_URL}/topics/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching topic with ID ${id}:`, error);
    return null;
  }
};

export const createTopic = async (topicData: Omit<Topic, '_id'>) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication token is missing. Please log in again.');
    }

    // Fetch user and comments data
    const userResponse = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const commentsResponse = await axios.get(`${API_BASE_URL}/comments`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const user = userResponse.data[0]; // Assuming you want the first user
    const comments = commentsResponse.data; // Assuming you want all comments

    const response = await axios.post(`${API_BASE_URL}/topics`, { ...topicData, user, comments }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating topic:', error);
    throw error;
  }
};

export const updateTopic = async (id: string, topicData: Partial<Omit<Topic, '_id'>>) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication token is missing. Please log in again.');
    }

    // Fetch user and comments data
    const userResponse = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const commentsResponse = await axios.get(`${API_BASE_URL}/comments`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const user = userResponse.data[0]; // Assuming you want the first user
    const comments = commentsResponse.data; // Assuming you want all comments

    const response = await axios.put(`${API_BASE_URL}/topics/${id}`, { ...topicData, user, comments }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating topic with ID ${id}:`, error);
    throw error;
  }
};

export const deleteTopic = async (id: string) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication token is missing. Please log in again.');
    }

    const response = await axios.delete(`${API_BASE_URL}/topics/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting topic with ID ${id}:`, error);
    throw error;
  }
};