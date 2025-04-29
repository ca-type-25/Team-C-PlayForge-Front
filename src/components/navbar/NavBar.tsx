import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';
import styles from './NavBar.module.scss'
import { NavLink } from 'react-router-dom';
import longNoBorder from '../../assets/LogoLongNoBorder.png';



const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           
    navigate('/login'); 
  };

  return (
    <nav className={styles['navbar']}>

      <div>
        <NavLink to="/home">
            <img src={longNoBorder} alt="PlayForge Logo" className={styles['logo-image']} />
        </NavLink>
        <Link to="/" className={styles['link-name']}>Home</Link>
        <Link to="/games" className={styles['link-name']}>Games</Link>
        <Link to="/articles" className={styles['link-name']}>Articles</Link>
        <Link to="/topics" className={styles['link-name']}>Forum</Link>

        {!user && (
          <>
            <Link to="/login" className={styles['link-name']}>Login</Link>
            <Link to="/register" className={styles['link-name']}>Register</Link>
          </>
        )}

        {isAdmin && (
          <>
            <Link to="/users" className={styles['link-name']}>Users</Link>
            <Link to="/admin/panel" className={styles['link-name']}>Admin Panel</Link>
          </>
        )}  
      </div>

      <div className={styles['greeting-and-logout-login']}>
        {user && (
          <>
            <Link to={`/users/${user._id || user.id}`} className={styles['greeting']}>Welcome, {user.username}</Link>
            <button onClick={handleLogout} className={styles['logout-login']}>Logout</button>
          </>
        )}
      </div>
      

    </nav>
  );
};

export default Navbar;
