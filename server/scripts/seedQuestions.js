import mongoose from 'mongoose';
import Question from '../models/Question.js';

const sampleQuestions = [
  {
    question: "What's the most interesting fact you learned today?",
    type: "text",
    category: "random_fact"
  },
  {
    question: "How fascinating did you find this random fact? (1-5)",
    type: "rating",
    category: "random_fact"
  },
  {
    question: "Did this fact change your perspective on something?",
    type: "boolean",
    category: "random_fact"
  },
  {
    question: "Share a surprising fact about your favorite topic:",
    type: "text",
    category: "random_fact"
  },
  {
    question: "Rate how likely you are to share this fact with others:",
    type: "rating",
    category: "random_fact"
  },
  {
    question: "Would you like to learn more about this topic?",
    type: "boolean",
    category: "random_fact"
  },
  {
    question: "What's the most unexpected fact you discovered recently?",
    type: "text",
    category: "random_fact"
  },
  {
    question: "How mind-blowing was this fact? (1-5)",
    type: "rating",
    category: "random_fact"
  },
  {
    question: "Is this the first time you've heard this fact?",
    type: "boolean",
    category: "random_fact"
  }
];

const seedQuestions = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/streaktracker');
    
    // Clear existing questions
    await Question.deleteMany({ category: 'random_fact' });
    
    // Insert new questions
    await Question.insertMany(sampleQuestions);
    
    console.log('Successfully seeded questions!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
};

seedQuestions(); 