import express from 'express';
import { 
  updateStreak,
  getStreak,
  resetStreak
} from '../controllers/streakController.js';
import User from '../models/User.js';

const router = express.Router();

// Streak routes
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.streak);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/update/:userId', async (req, res) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastActive = user.streak.lastActiveDate ? new Date(user.streak.lastActiveDate) : null;
    if (lastActive) {
      lastActive.setHours(0, 0, 0, 0);
    }

    // If already active today, return current streak
    if (lastActive && lastActive.getTime() === today.getTime()) {
      return res.json(user.streak);
    }

    // Check if streak should continue or reset
    if (lastActive) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActive.getTime() === yesterday.getTime()) {
        // Streak continues
        user.streak.currentStreak += 1;
      } else {
        // Streak breaks
        user.streak.currentStreak = 1;
      }
    } else {
      // First time streak
      user.streak.currentStreak = 1;
    }

    // Update longest streak if needed
    if (user.streak.currentStreak > user.streak.longestStreak) {
      user.streak.longestStreak = user.streak.currentStreak;
    }

    // Update streak history
    user.streak.lastActiveDate = today;
    user.streak.history.push({
      date: today,
      problemsSolved: 1, // This could be dynamic based on actual problems solved
      pointsEarned: 10 // This could be dynamic based on actual points earned
    });

    await user.save();
    res.json(user.streak);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/reset/:userId', async (req, res) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.streak = {
      currentStreak: 0,
      longestStreak: user.streak.longestStreak, // Preserve longest streak
      lastActiveDate: null,
      history: []
    };

    await user.save();
    res.json(user.streak);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
