import { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import { motion } from 'framer-motion';

const UserForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(API_ENDPOINTS.USERS, formData);
      onUserCreated(response.data);
      setFormData({ username: '', email: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="streak-header text-2xl">Create New User</h3>
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 px-4 py-5 sm:px-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-[#5B2A86]">
            Username
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="username"
              id="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="form-input block w-full rounded-md border-[#E0E0E0] shadow-sm focus:border-[#5B2A86] focus:ring focus:ring-[#5B2A86] focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#5B2A86]">
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input block w-full rounded-md border-[#E0E0E0] shadow-sm focus:border-[#5B2A86] focus:ring focus:ring-[#5B2A86] focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <motion.button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex justify-center items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="loading-spinner-sm"></div>
            ) : (
              'Create User'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default UserForm; 