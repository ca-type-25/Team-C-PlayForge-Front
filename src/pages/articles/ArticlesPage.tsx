import React from 'react';
import ArticlesList from '../../components/Articles/ArticlesList';
import Footer from '../../components/footer/Footer';

const ArticlesPage: React.FC = () => {
  return (
    <div className="articles-page">
      <ArticlesList />
      <Footer />
    </div>
  );
};

export default ArticlesPage;