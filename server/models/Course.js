import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  order: { type: Number, required: true },
  problems: [{
    title: { type: String, required: true },
    description: String,
    type: { 
      type: String, 
      enum: ['multiple-choice', 'interactive', 'coding'],
      required: true 
    },
    content: {
      question: { type: String, required: true },
      options: [String],
      correctAnswer: String,
      explanation: String,
      hints: [String]
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    points: { type: Number, default: 10 },
    order: { type: Number, required: true }
  }]
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  thumbnail: String,
  category: {
    type: String,
    enum: ['mathematics', 'computer-science', 'physics', 'data-science'],
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  chapters: [chapterSchema],
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field on save
courseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Course', courseSchema); 