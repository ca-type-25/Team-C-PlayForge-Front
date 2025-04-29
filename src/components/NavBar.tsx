import React from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';
import styles from './NavBar.module.scss'

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           
    navigate('/login'); 
  };

  return (
    <nav className={styles['navbar']}>
      {isAdmin && <Link to="/studios" className={styles['link-name']}>Game Studios</Link>}
      <Link to="/games" className={styles['link-name']}>Games</Link>
      <Link to="/articles" className={styles['link-name']}>Articles</Link>
      <Link to="/reviews" className={styles['link-name']}>Reviews</Link>
      {!user && (
        <>
          <Link to="/login" className={styles['link-name']}>Login</Link>
          <Link to="/register" className={styles['link-name']}>Register</Link>
        </>
      )}
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout} className={styles['logout-button']}>Logout</button>
        </>
      ) : (
        <button onClick={() => navigate('/login')} >Login</button>
      )}
    </nav>
  );
};

export default Navbar;
