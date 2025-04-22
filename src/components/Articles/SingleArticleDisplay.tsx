import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { getArticleById } from '../../api/articlesApi';
import axios from 'axios';


interface Article {
  _id: string;
  title: string;
  content: string;
  image?: string;
  video?: string;
  createdAt: string;
  updatedAt: string;
}

const SingleArticleDisplay: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError('Article ID is missing.');
        setLoading(false);
        return;
      }
      try {
        console.log(`Fetching article with ID: ${id}`);
        const articleData = await getArticleById(id);
        console.log("API Response Data:", articleData);
        setArticle(articleData);
      } catch (err: unknown) { 
        console.error('Error fetching article:', err); 

        let message = 'Failed to fetch article'; 
        if (axios.isAxiosError(err)) { 
            message = err.response?.data?.message || err.message;
        } else if (err instanceof Error) { 
            message = err.message;
        }

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading article...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (!article) {
    return <div className="text-center mt-5">Article not found or failed to load.</div>;
  }

  return (
    <Container className="mt-4">
      <Link to="/articles" className="btn btn-outline-secondary mb-4">
        &larr; Back to Articles
      </Link>
      
      <Card className="border-0 shadow-sm">
        {article.image && (
          <div className="article-image-container">
            <img 
              src={article.image} 
              alt={article.title} 
              className="article-header-image img-fluid" 
            />
          </div>
        )}
        
        <Card.Body className="p-4">
          <h1 className="mb-3">{article.title}</h1>
          
          <div className="mb-4">
            <small className="text-muted">
              Published on {new Date(article.createdAt).toLocaleDateString()}
            </small>
          </div>
          
          <div className="article-content">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {article.video && (
            <div className="mt-4">
              <h4>Video</h4>
              <div className="ratio ratio-16x9">
                <iframe 
                  src={article.video} 
                  title={article.title} 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingleArticleDisplay;