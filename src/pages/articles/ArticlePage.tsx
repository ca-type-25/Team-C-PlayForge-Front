import React from 'react';
import SingleArticleDisplay from '../../components/Articles/SingleArticleDisplay';
import styles from './ArticlePage.module.scss';

const ArticlePage: React.FC = () => {
  return (
    <div className={styles.articlePageContainer}>
      <div className={styles.articleWrapper}>
        <SingleArticleDisplay />
      </div>
    </div>
  );
};

export default ArticlePage;