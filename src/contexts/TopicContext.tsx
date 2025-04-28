import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllTopics, getTopicById, createTopic, updateTopic, deleteTopic } from '../api/topicsApi';


interface Topic {
  _id: string;
  title: string;
  description: string;
  context?: string;
  user: string;
  comments: Comment[];
}

interface Comment {
  _id: string;
  content: string;
  user: string;
  createdAt: string;
}


interface TopicContextType {
  topics: Topic[];
  currentTopic: Topic | null;
  loading: boolean;
  error: string | null;
  fetchTopics: () => Promise<void>;
  fetchTopic: (id: string) => Promise<Topic | null>;
  addTopic: (topic: Partial<Topic>) => Promise<Topic>;
  editTopic: (id: string, topic: Partial<Topic>) => Promise<Topic>;
  removeTopic: (id: string) => Promise<void>;
  setCurrentTopic: (topic: Topic | null) => void;
}


const TopicContext = createContext<TopicContextType | undefined>(undefined);


export const TopicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

 
  const fetchTopics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllTopics();
      setTopics(data);
    } catch (err) {
      console.error('Error fetching topics:', err);
      setError('Failed to fetch topics');
    } finally {
      setLoading(false);
    }
  };

 
  const fetchTopic = async (id: string): Promise<Topic | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTopicById(id);
      setCurrentTopic(data);
      return data;
    } catch (err) {
      console.error('Error fetching topic:', err);
      setError('Failed to fetch topic');
      return null;
    } finally {
      setLoading(false);
    }
  };

  
  const addTopic = async (topic: Partial<Topic>): Promise<Topic> => {
    setLoading(true);
    setError(null);
    try {
      const newTopic = await createTopic({
        title: topic.title || '',
        description: topic.description || '',
        user: topic.user || '',
        comments: topic.comments || [],
        ...(topic.context && { context: topic.context })
      });
      setTopics([...topics, newTopic]);
      return newTopic;
    } catch (err) {
      console.error('Error creating topic:', err);
      setError('Failed to create topic');
      throw err;
    } finally {
      setLoading(false);
    }
  };

 
  const editTopic = async (id: string, topic: Partial<Topic>): Promise<Topic> => {
    setLoading(true);
    setError(null);
    try {
      const updatedTopic = await updateTopic(id, topic);
      setTopics(topics.map(t => t._id === id ? updatedTopic : t));
      if (currentTopic && currentTopic._id === id) {
        setCurrentTopic(updatedTopic);
      }
      return updatedTopic;
    } catch (err) {
      console.error('Error updating topic:', err);
      setError('Failed to update topic');
      throw err;
    } finally {
      setLoading(false);
    }
  };

 
  const removeTopic = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await deleteTopic(id);
      setTopics(topics.filter(t => t._id !== id));
      if (currentTopic && currentTopic._id === id) {
        setCurrentTopic(null);
      }
    } catch (err) {
      console.error('Error deleting topic:', err);
      setError('Failed to delete topic');
      throw err;
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <TopicContext.Provider
      value={{
        topics,
        currentTopic,
        loading,
        error,
        fetchTopics,
        fetchTopic,
        addTopic,
        editTopic,
        removeTopic,
        setCurrentTopic
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};


export const useTopic = () => {
  const context = useContext(TopicContext);
  if (context === undefined) {
    throw new Error('useTopic must be used within a TopicProvider');
  }
  return context;
};