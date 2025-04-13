import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import { motion } from 'framer-motion';
import StreakCalendar from './StreakCalendar';

const StreakDashboard = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.STREAK(userId));
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user data');
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

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
    <div className="bg-white rounded shadow-sm max-w-md mx-auto">
      <StreakCalendar 
        activityData={userData?.streakHistory || []} 
        currentMonth={currentMonth}
      />
    </div>
  );
};

export default StreakDashboard; 