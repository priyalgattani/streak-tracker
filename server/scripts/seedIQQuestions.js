import mongoose from 'mongoose';
import Question from '../models/Question.js';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Connect to MongoDB
console.log('Connecting to MongoDB...');
const MONGODB_URI = 'mongodb+srv://priyalgattani:6czCCy8tf87rCeb0@cluster0.osvlpcr.mongodb.net/streaktracker?retryWrites=true&w=majority';
console.log('URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    seedData();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

const iqQuestions = [
  {
    question: "What number should come next in the pattern: 2, 6, 12, 20, 30, ?",
    type: "mcq",
    category: "iq_test",
    options: [
      { text: "42", isCorrect: true },
      { text: "40", isCorrect: false },
      { text: "38", isCorrect: false },
      { text: "44", isCorrect: false }
    ],
    explanation: "The pattern adds consecutive even numbers: +4, +6, +8, +10, so +12 gives 42"
  },
  {
    question: "If all Zips are Zaps, and some Zaps are Zops, then:",
    type: "mcq",
    category: "iq_test",
    options: [
      { text: "All Zips are definitely Zops", isCorrect: false },
      { text: "Some Zips might be Zops", isCorrect: true },
      { text: "No Zips are Zops", isCorrect: false },
      { text: "All Zops are Zips", isCorrect: false }
    ],
    explanation: "Since all Zips are Zaps, and some Zaps are Zops, it follows that some Zips might be Zops"
  },
  {
    question: "Complete the analogy: Book is to Reading as Fork is to:",
    type: "mcq",
    category: "iq_test",
    options: [
      { text: "Kitchen", isCorrect: false },
      { text: "Eating", isCorrect: true },
      { text: "Food", isCorrect: false },
      { text: "Cooking", isCorrect: false }
    ],
    explanation: "A book is used for reading, just as a fork is used for eating"
  }
];

const randomFacts = [
  {
    question: "A day on Venus is longer than its year. Venus takes 243 Earth days to rotate on its axis but only 225 Earth days to orbit the Sun.",
    type: "text",
    category: "random_fact"
  },
  {
    question: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
    type: "text",
    category: "random_fact"
  },
  {
    question: "The first oranges weren't orange. The original oranges from Southeast Asia were actually green.",
    type: "text",
    category: "random_fact"
  }
];

async function seedData() {
  try {
    // Clear existing data
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert new data
    await Question.insertMany(iqQuestions);
    console.log('Inserted IQ questions');
    
    await Question.insertMany(randomFacts);
    console.log('Inserted random facts');

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
} 