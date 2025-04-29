import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTopics } from '../../api/topicsApi'; 
import styles from '../topics/TopicsPage.module.scss';
import Footer from '../../components/footer/Footer';

interface Topic {
  _id: string;
  title: string;
  description: string;
  user: string;
  comments: Comment[];
}

interface Comment {
  _id: string;
  content: string;
  user: string;
  createdAt: string;
}

const TopicsPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsData = await getAllTopics();
        console.log('Fetched topics:', topicsData); 
        setTopics(topicsData);
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError('Failed to fetch topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return <div>Loading topics...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles['page-container']}>
      <h1>Topics</h1>
      <div className={styles['all-topics-wrapper']}>
        {topics.length === 0 ? (

        <div>
          <h3>No topics found</h3>
          <p>Be the first to create a topic!</p>
        </div>

        ) : (
          topics.map(topic => (
            <div key={topic._id}>
              <div className={styles['topic-wrapper']}>
                <p className={styles['topic-title']}>{topic.title}</p>
                <p className={styles['topic-description']}>{topic.description}</p>
                <Link to={`/topics/${topic._id}`} className={styles["view-discussion"]}>View Discussion</Link>
              </div>
            </div>
          ))
        )}
      </div>
      <Link to="/topics/create" className={styles["create-topic"]}>Create Topic</Link>
      <Footer />
    </div>
  );
};

export default TopicsPage;