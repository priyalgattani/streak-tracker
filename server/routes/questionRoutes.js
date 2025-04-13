import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// Get random questions
router.get('/random', async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 3;
    const category = req.query.category || 'random_fact';
    
    console.log('Fetching questions with params:', { count, category });
    
    // First check if we have any questions in the database
    const totalQuestions = await Question.countDocuments({ category });
    console.log(`Found ${totalQuestions} questions in category ${category}`);
    
    if (totalQuestions === 0) {
      return res.json([]);
    }
    
    const questions = await Question.aggregate([
      { $match: { category: category } },
      { $sample: { size: count } }
    ]);
    
    console.log(`Returning ${questions.length} questions`);
    res.json(questions);
  } catch (error) {
    console.error('Error fetching random questions:', error);
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

// Add a new question
router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    const savedQuestion = await question.save();
    console.log('New question added:', savedQuestion);
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(400).json({ message: error.message });
  }
});

// Add multiple questions
router.post('/bulk', async (req, res) => {
  try {
    const questions = await Question.insertMany(req.body);
    console.log(`Added ${questions.length} questions`);
    res.status(201).json(questions);
  } catch (error) {
    console.error('Error adding multiple questions:', error);
    res.status(400).json({ message: error.message });
  }
});

export default router; 