import Question from '../models/Question.js';

// Get random questions
export const getRandomQuestions = async (req, res) => {
  try {
    // Get the number of questions requested (default to 3)
    const count = parseInt(req.query.count) || 3;
    
    // Get random questions using aggregation pipeline
    const questions = await Question.aggregate([
      { $match: { category: 'random_fact' } },
      { $sample: { size: count } }
    ]);
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new question
export const addQuestion = async (req, res) => {
  try {
    const { question, type, category } = req.body;
    
    const newQuestion = new Question({
      question,
      type,
      category
    });
    
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add multiple questions at once
export const addMultipleQuestions = async (req, res) => {
  try {
    const questions = req.body;
    const savedQuestions = await Question.insertMany(questions);
    res.status(201).json(savedQuestions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 