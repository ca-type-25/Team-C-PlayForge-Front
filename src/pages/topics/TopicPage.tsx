import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteTopic, getTopicById } from '../../api/topicsApi'; 
import styles from '../topics/TopicPage.module.scss';
import api from '../../api';
import Footer from '../../components/footer/Footer';

interface Topic {
  _id: string;
  title: string;
  description: string;
  user: string | User;
  comments: Comment[];
}

interface User {
  _id: string;
  name: string;
}

interface Comment {
  _id: string,
  message: string,
  picture: string,
  topic: string | { _id: string; title: string }
  user: User 
}

const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const navigate = useNavigate(); 

  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const fetchTopic = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const topicData = await getTopicById(id);
        console.log('Fetched topic data:', topicData);
        setTopic(topicData);
      } catch (error) {
        console.error('Error fetching topic:', error);
        setError('Failed to fetch topic details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopic();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await api.get('/comments'); 

        const filteredComments = data.filter((comment: Comment) => {
          if (comment.topic === null) return false; 
          if (typeof comment.topic === 'string') {
            return comment.topic === id;
          } else {
            return comment.topic._id === id;
          }
        });

        setComments(filteredComments);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [id]);


  const handleDelete = async () => {
    if (id) {
      try {
        await deleteTopic(id);
        navigate('/topics'); 
      } catch (error) {
        console.error('Error deleting topic:', error);
      }
    }
  };

  if (loading) return <div>Loading topic...</div>;
  if (error) return <div>{error}</div>; 
  if (!topic) return <div>Topic not found</div>;

  return (
    <div className={styles['page-container']}>
      <div>
        <Link to="/topics" className={styles['button']}>Back to Topics</Link>
        <Link to={`/topics/${id}/edit`} className={styles['button']}>Edit Topic</Link>
        <button onClick={handleDelete} className={styles['button']}>Delete Topic</button>
      </div>
      
      <div className={styles['topic-wrapper']}>
        <p className={styles['created-by-user']}>User: {typeof topic.user === 'object' ? `${topic.user.name}` : 'Unknown'}</p>
        <p className={styles['topic-title']}>{topic.title}</p>
        <p className={styles['topic-description']}>{topic.description}</p>
        
        
        <div>
          <div >
            {comments.map(comment => (
              <div key={comment._id} className={styles['comment-wrapper']}>
                <div className={styles['user-avatar-and-username']}>
                  <img src={comment.picture} alt="Comment picture" className={styles['user-avatar']}/>
                  <p>{typeof comment.user === "object" ? comment.user.name : comment.user}</p>
                </div>
                <Link to={`/comments/${comment._id}`} className={styles['comment-text']}>{comment.message}</Link>
              </div>
            ))}
          </div>
          <Link to='/comments/create' className={styles['button']}>Add new comment</Link>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TopicPage;