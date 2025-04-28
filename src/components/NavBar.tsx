import React from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           
    navigate('/login'); 
  };

  return (
    <nav className="navbar" style={{ display: 'flex', gap: '10px' }}>
      {isAdmin && <Link to="/studios">Game Studios</Link>}
      <Link to="/games">Games</Link>
      <Link to="/articles">Articles</Link>
      <Link to="/reviews">Reviews</Link>
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={() => navigate('/login')}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
