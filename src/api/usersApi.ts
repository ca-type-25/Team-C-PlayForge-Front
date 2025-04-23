import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface User {
  _id: string;
  username: string;
  email?: string;
}

// Use the same token retrieval method as in topicsApi.ts
const getAuthToken = () => {
  // For testing, you can use a hardcoded token that you know works
  // const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Your valid token here
  
  // Or retrieve from localStorage
  return localStorage.getItem('token'); // Change from 'authToken' to 'token'
};

export const getAllUsers = async () => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      console.error('No authentication token found');
      return { data: [] }; // Return in expected format to prevent UI errors
    }
    
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Return in the expected format for your component
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching users:', error);
    // Return empty array in the expected format to prevent UI errors
    return { data: [] };
  }
};

export const getUserById = async (id: string) => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      console.error('No authentication token found');
      return null;
    }
    
    const response = await axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
};