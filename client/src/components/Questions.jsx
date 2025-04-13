import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});
  const [questionType, setQuestionType] = useState('random_fact');

  useEffect(() => {
    fetchQuestions();
  }, [questionType]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/questions/random?count=3&category=${questionType}`, {
        withCredentials: true
      });
      
      console.log('Response:', response.data); // Debug log
      
      if (Array.isArray(response.data)) {
        setQuestions(response.data);
        // Initialize answers and explanations
        const initialAnswers = {};
        const initialExplanations = {};
        response.data.forEach(q => {
          initialAnswers[q._id] = '';
          initialExplanations[q._id] = false;
        });
        setAnswers(initialAnswers);
        setShowExplanations(initialExplanations);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load questions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const toggleExplanation = (questionId) => {
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const renderMCQOptions = (question) => (
    <div className="mcq-options">
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`btn ${
            answers[question._id] === index 
              ? 'btn-primary' 
              : 'btn-outline-primary'
          } mb-2 w-100 text-start`}
          onClick={() => handleAnswerChange(question._id, index)}
        >
          {option.text}
        </button>
      ))}
      {answers[question._id] !== '' && (
        <div className="mt-3">
          <button
            className="btn btn-link"
            onClick={() => toggleExplanation(question._id)}
          >
            {showExplanations[question._id] ? 'Hide Explanation' : 'Show Explanation'}
          </button>
          {showExplanations[question._id] && (
            <div className="alert alert-info mt-2">
              <strong>Explanation: </strong>
              {question.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="questions-container text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="questions-container">
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            className="btn btn-outline-danger ms-3"
            onClick={fetchQuestions}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="questions-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="questions-header mb-0">
          {questionType === 'iq_test' ? 'IQ Questions' : 'Daily Random Facts'}
        </h2>
        <div className="btn-group">
          <button
            className={`btn ${questionType === 'random_fact' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setQuestionType('random_fact')}
          >
            Random Facts
          </button>
          <button
            className={`btn ${questionType === 'iq_test' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setQuestionType('iq_test')}
          >
            IQ Questions
          </button>
        </div>
      </div>
      <div className="questions-content">
        {questions.length === 0 ? (
          <div className="alert alert-info">
            No questions available. 
            <button 
              className="btn btn-outline-primary ms-3"
              onClick={fetchQuestions}
            >
              Refresh
            </button>
          </div>
        ) : (
          questions.map((q) => (
            <div key={q._id} className="question-card">
              <h3 className="question-title">
                {q.question}
                {q.difficulty && (
                  <span className={`badge bg-${q.difficulty === 'easy' ? 'success' : q.difficulty === 'medium' ? 'warning' : 'danger'} ms-2`}>
                    {q.difficulty}
                  </span>
                )}
              </h3>
              <div className="question-input">
                {q.type === 'mcq' && renderMCQOptions(q)}
                {q.type === 'text' && (
                  <textarea 
                    className="form-control" 
                    placeholder="Type your answer here..."
                    rows="2"
                    value={answers[q._id] || ''}
                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  />
                )}
                {q.type === 'rating' && (
                  <div className="rating-buttons">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button 
                        key={rating} 
                        className={`btn ${answers[q._id] === rating ? 'btn-primary' : 'btn-outline-primary'} rating-btn`}
                        onClick={() => handleAnswerChange(q._id, rating)}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                )}
                {q.type === 'boolean' && (
                  <div className="boolean-buttons">
                    <button 
                      className={`btn ${answers[q._id] === true ? 'btn-success' : 'btn-outline-success'} me-2`}
                      onClick={() => handleAnswerChange(q._id, true)}
                    >
                      Yes
                    </button>
                    <button 
                      className={`btn ${answers[q._id] === false ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={() => handleAnswerChange(q._id, false)}
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {questions.length > 0 && (
          <div className="text-center mt-4">
            <button 
              className="btn btn-primary"
              onClick={fetchQuestions}
            >
              Get New Questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions; 