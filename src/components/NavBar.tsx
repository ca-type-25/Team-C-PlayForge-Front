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
    <nav className="navbar" style={{ display: 'flex', gap: '10px' }}>
      <Link to="/">Home</Link>
      <Link to="/games">Games</Link>
      <Link to="/articles">Articles</Link>

      {!user && (
        <>
          <Link to="/login" className={styles['link-name']}>Login</Link>
          <Link to="/register" className={styles['link-name']}>Register</Link>
        </>
      )}

      {isAdmin && (
        <>
          <Link to="/users">Users</Link>
          <Link to="admin/panel">Admin Panel</Link>
        </>
      )}  
      
      {user ? (
        <>
          <Link to={`/users/${user._id || user.id}`}>
            <span>Welcome, {user.username}</span>
          </Link>

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={() => navigate('/login')} >Login</button>
      )}
    </nav>
  );
};

export default Navbar;
