import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';


export interface ArticleData {
  title: string;
  content: string;
  video?: string;
  image?: string;
  users?: string[];
  subjects?: string[];
}


export const getAllArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};


export const getArticleById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    throw error;
  }
};


export const createArticle = async (articleData: ArticleData) => {
  try {
    console.log('Sending article data:', JSON.stringify(articleData));
    
    const response = await axios.post(`${API_BASE_URL}/articles`, articleData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};


export const updateArticle = async (id: string, articleData: ArticleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/articles/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating article with ID ${id}:`, error);
    throw error;
  }
};


export const deleteArticle = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting article with ID ${id}:`, error);
    throw error;
  }
};