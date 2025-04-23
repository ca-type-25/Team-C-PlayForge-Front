import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';


export interface User {
  _id: string;
  username: string;
}


const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getAllUsers = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const getUserById = async (id: string) => {
  try {
    const token = getAuthToken();
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

export const loginUser = async (credentials: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};