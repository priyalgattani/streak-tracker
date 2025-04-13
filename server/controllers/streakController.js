import User from '../models/User.js';

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = new User({ username, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's streak
export const getStreak = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.streak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update streak
export const updateStreak = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date();
    const lastActive = user.streak.lastActiveDate;
    
    // If last active was yesterday, increment streak
    if (lastActive && isYesterday(lastActive, today)) {
      user.streak.currentStreak += 1;
      if (user.streak.currentStreak > user.streak.longestStreak) {
        user.streak.longestStreak = user.streak.currentStreak;
      }
    } else if (!isToday(lastActive, today)) {
      // If missed a day, reset streak
      user.streak.currentStreak = 1;
    }

    user.streak.lastActiveDate = today;
    await user.save();
    res.json(user.streak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset streak
export const resetStreak = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.streak.currentStreak = 0;
    user.streak.lastActiveDate = null;
    await user.save();
    res.json(user.streak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper functions
const isYesterday = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.abs(date1 - date2) <= oneDay;
};

const isToday = (date1, date2) => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
};
