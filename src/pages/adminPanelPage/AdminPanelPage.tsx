import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, updateUserRole, deleteUser, User } from '../../api/usersApi';

const AdminPanelPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((response) => setUsers(response.data))
      .catch(console.error);
  }, []);

  const handleRoleChange = (userId: string, newRole: string) => {
    updateUserRole(userId, newRole)
      .then(() => {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch(console.error);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      if (window.confirm('This action is irreversible. Confirm again to delete.')) {
        deleteUser(userId)
          .then(() => {
            setUsers((prev) => prev.filter((user) => user._id !== userId));
          })
          .catch(console.error);
      }
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Content Management</h2>
      <ul>
        <li><button onClick={() => navigate('/games/create')}>Create Game</button></li>
        <li><button onClick={() => navigate('/subjects/create')}>Create Subject</button></li>
        <li><button onClick={() => navigate('/articles/create')}>Create Article</button></li>
        <li><button onClick={() => navigate('/genres/create')}>Create Genre</button></li>
        <li><button onClick={() => navigate('/studios/create')}>Create Studio</button></li>
        <li><button onClick={() => navigate('/reviews/create')}>Create Review</button></li>
        <li><button onClick={() => navigate('/comments/create')}>Create Comment</button></li>
      </ul>
    </div>
  );
};

export default AdminPanelPage;