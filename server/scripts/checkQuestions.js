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

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/streaktracker';

async function checkQuestions() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('URI:', MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check random facts
    const randomFacts = await Question.find({ category: 'random_fact' });
    console.log('\nRandom Facts:', randomFacts.length);
    if (randomFacts.length > 0) {
      console.log('Sample random fact:', randomFacts[0]);
    }

    // Check IQ questions
    const iqQuestions = await Question.find({ category: 'iq_test' });
    console.log('\nIQ Questions:', iqQuestions.length);
    if (iqQuestions.length > 0) {
      console.log('Sample IQ question:', iqQuestions[0]);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkQuestions(); 