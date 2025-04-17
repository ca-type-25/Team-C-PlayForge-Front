import React from 'react';
import ArticlesList from '../../components/Articles/ArticlesList';


const ArticlePage: React.FC = () => {
  return (
    <div className="articles-page"> 
      <ArticlesList />
    </div>
  );
};


export default ArticlePage;