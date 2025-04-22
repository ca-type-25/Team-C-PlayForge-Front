import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Badge, Card } from 'react-bootstrap';
import './ArticleDetail.css';
import { getArticleById } from '../../api/articlesApi';

interface Subject {
  id: string;
  type: 'Game' | 'Studio' | 'Genre';
}

interface Article {
  _id: string;
  title: string;
  content: string;
  video?: string;
  image?: string;
  user?: string;
  subject?: Subject;
  createdAt: string;
  updatedAt: string;
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError('Article ID is missing');
        setLoading(false);
        return;
      }
      
      try {
        const articleData = await getArticleById(id);
        setArticle(articleData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch article');
        setLoading(false);
        console.error('Error fetching article:', err);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
      console.log("Rendering: Loading state"); 
      return <div className="text-center mt-5">Loading article...</div>;
  }

  if (error) {
      console.log("Rendering: Error state -", error); 
      return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (!article) {
      console.log("Rendering: Article not found state (article is null/undefined)"); 
      return <div className="text-center mt-5">Article not found or failed to load.</div>;
  }

  console.log("Rendering: Article details for", article.title); 
  return (
    <Container className="mt-4 article-detail">
      <Link to="/articles" className="btn btn-outline-secondary mb-4">
        &larr; Back to Articles
      </Link>
      
      <Card className="border-0 shadow-sm">
        {article.image && (
          <div className="article-image-container">
            <img 
              src={article.image} 
              alt={article.title} 
              className="article-header-image" 
            />
          </div>
        )}
        
        <Card.Body className="p-4">
          <h1 className="mb-3">{article.title}</h1>
          
          <div className="mb-4">
            <small className="text-muted">
              Published on {new Date(article.createdAt).toLocaleDateString()}
            </small>
            {article.subject && article.subject.type && (
              <Badge bg="secondary" className="ms-2">
                {article.subject.type}
              </Badge>
            )}
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

export default ArticleDetail;