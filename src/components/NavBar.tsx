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
      {isAdmin && <Link to="/admin">Admin Panel</Link>}
      <Link to="/">Home</Link>
      <Link to="/games">Games</Link>
      <Link to="/articles">Articles</Link>
      
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
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
        <button onClick={() => navigate('/login')}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
