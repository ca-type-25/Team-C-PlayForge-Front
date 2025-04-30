import React from 'react';
import ArticlesList from '../../components/Articles/ArticlesList';
import styles from './ArticlesPage.module.scss';

const ArticlesPage: React.FC = () => {
  return (
    <div className={styles.articlesPageContainer}>
      <h1 className={styles.pageTitle}>Articles</h1>
      <div className={styles.articlesWrapper}>
        <ArticlesList />
      </div>
    </div>
  );
};

export default ArticlesPage;