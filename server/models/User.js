import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const progressSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  completedChapters: [{
    chapterId: String,
    completedAt: Date
  }],
  completedProblems: [{
    problemId: String,
    attempts: Number,
    score: Number,
    completedAt: Date
  }],
  lastAccessedAt: { type: Date, default: Date.now }
});

const achievementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['streak', 'course_completion', 'problem_solving', 'speed'],
    required: true
  },
  title: String,
  description: String,
  earnedAt: { type: Date, default: Date.now },
  metadata: mongoose.Schema.Types.Mixed
});

const streakHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  problemsSolved: {
    type: Number,
    default: 0
  },
  pointsEarned: {
    type: Number,
    default: 0
  }
});

const streakSchema = new mongoose.Schema({
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date,
    default: null
  },
  history: [streakHistorySchema]
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePicture: String,
  bio: String,
  level: { type: Number, default: 1 },
  totalPoints: { type: Number, default: 0 },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null },
    history: [{
      date: { type: Date },
      activity: { type: String }
    }]
  },
  courseProgress: [progressSchema],
  achievements: [achievementSchema],
  preferences: {
    dailyGoal: { type: Number, default: 1 },
    emailNotifications: { type: Boolean, default: true },
    theme: { type: String, default: 'light' }
  },
  stats: {
    totalQuestions: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Method to update user stats
userSchema.methods.updateStats = function(isCorrect) {
  this.stats.totalQuestions++;
  if (isCorrect) {
    this.stats.correctAnswers++;
  }
  this.stats.averageScore = (this.stats.correctAnswers / this.stats.totalQuestions) * 100;
};

// Method to check and update streak
userSchema.methods.updateStreak = async function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActive = this.streak.lastActiveDate ? new Date(this.streak.lastActiveDate) : null;
  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
  }

  if (!lastActive || lastActive.getTime() < today.getTime()) {
    if (lastActive && today.getTime() - lastActive.getTime() <= 86400000) {
      // Increment streak if last active was yesterday
      this.streak.current++;
      if (this.streak.current > this.streak.longest) {
        this.streak.longest = this.streak.current;
      }
    } else {
      // Reset streak if more than a day has passed
      this.streak.current = 1;
    }

    this.streak.lastActiveDate = today;
    this.streak.history.push({
      date: today,
      activity: 'daily_login'
    });

    await this.save();
  }

  return this.streak;
};

const User = mongoose.model('User', userSchema);

export default User;
