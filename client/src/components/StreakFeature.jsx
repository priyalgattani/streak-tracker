import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';

const StreakFeature = ({ userId }) => {
  const [streakData, setStreakData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    fetchStreakData();
  }, [userId]);

  const fetchStreakData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.STREAK(userId));
      setStreakData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch streak data');
      setLoading(false);
    }
  };

  const updateStreak = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.UPDATE_STREAK(userId));
      if (response.data.currentStreak > streakData.currentStreak) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      setStreakData(response.data);
    } catch (error) {
      setError('Failed to update streak');
    }
  };

  const getStreakEmoji = (streak) => {
    if (streak >= 30) return '🔥';
    if (streak >= 20) return '⚡';
    if (streak >= 10) return '✨';
    return '🌟';
  };

  const getMilestoneMessage = (streak) => {
    if (streak >= 30) return 'Month-long Mastery!';
    if (streak >= 20) return 'Outstanding Dedication!';
    if (streak >= 10) return 'Perfect 10!';
    if (streak >= 7) return 'Week-long Wonder!';
    if (streak >= 3) return 'Triple Threat!';
    return 'Keep Going!';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-bounce text-6xl">
            {getStreakEmoji(streakData.currentStreak)}
          </div>
        </div>
      )}

      {/* Streak Counter */}
      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-indigo-600 mb-2">
          {streakData.currentStreak}
        </div>
        <div className="text-xl font-medium text-gray-700">
          Day{streakData.currentStreak !== 1 ? 's' : ''} in a Row
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {getMilestoneMessage(streakData.currentStreak)}
        </div>
      </div>

      {/* Streak Progress */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Today's Progress</span>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {streakData.lastActiveDate === new Date().toDateString() ? '100%' : '0%'}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
              style={{ width: streakData.lastActiveDate === new Date().toDateString() ? '100%' : '0%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-indigo-600">
            {streakData.longestStreak}
          </div>
          <div className="text-sm text-gray-600">Longest Streak</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {streakData.history?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Total Active Days</div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={updateStreak}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Complete Today's Challenge
      </button>

      {/* Streak Tips */}
      <div className="mt-6 text-sm text-gray-500">
        <h4 className="font-medium text-gray-700 mb-2">💡 Tips to maintain your streak:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Complete at least one lesson daily</li>
          <li>Set a regular time for learning</li>
          <li>Enable notifications for daily reminders</li>
        </ul>
      </div>
    </div>
  );
};

export default StreakFeature; 