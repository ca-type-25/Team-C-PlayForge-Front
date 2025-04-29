import React from 'react';
import SingleArticleDisplay from '../../components/Articles/SingleArticleDisplay';
import Footer from '../../components/footer/Footer';

const ArticlePage: React.FC = () => {
  return (
    <div>
      <SingleArticleDisplay />
      <Footer />
    </div>
  );
};

export default ArticlePage;