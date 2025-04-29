import React from 'react'; 
import longNoBorder from '../../assets/LogoLongNoBorder.png';
import ArticlesList from '../../components/Articles/ArticlesList';
import styles from "./HomePage.module.scss";
import Footer from '../../components/footer/Footer';

const HomePage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Logo */}
        <header className={styles.logoHeader}>
          <img
            src={longNoBorder}
            alt="PlayForge Logo"
            className={styles.logo}
          />
        </header>

        {/* Slogan */}
        <section className={styles.slogan}>
          <p className={styles.sloganText}>
            The ultimate community hub for gamers. Stay updated, explore
            trending games, and more.
          </p>
        </section>

        {/* Latest Articles */}
        <main className={styles.articles}>
          <header className={styles.articlesHeader}>
            <h1>Trending Articles</h1>
          </header>
          <ArticlesList hideCreateNew />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;




