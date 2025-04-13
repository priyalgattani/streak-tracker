import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import { motion } from 'framer-motion';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.USERS);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">{error}</div>
    );
  }

  return (
    <div className="user-list">
      <h2 className="streak-header">All Users</h2>
      {users.length === 0 ? (
        <div className="text-center text-gray-500 p-4">No users found</div>
      ) : (
        <div>
          {users.map(user => (
            <div key={user._id} className="user-item">
              <div className="user-name">{user.username}</div>
              <div className="user-email">{user.email}</div>
              <div className="streak-info">
                {user.currentStreak === 0 ? (
                  <span>{user.currentStreak}day streak</span>
                ) : (
                  <span>Best: {user.longestStreak}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList; 