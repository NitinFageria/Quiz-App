import React, { useState } from 'react';

const QuizPage = ({ users, setUsers, userName }) => {
  const questions = [
    { question: 'Who was the first president of the United States?', options: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'], answer: 'George Washington' },
    { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'HyperTransfer Markup Language', 'HomeText Markup Language', 'None of the above'], answer: 'HyperText Markup Language' },
    { question: 'What year was the first iPhone released?', options: ['2005', '2007', '2009', '2010'], answer: '2007' },
    { question: 'Who invented the telephone?', options: ['Alexander Graham Bell', 'Thomas Edison', 'Nikola Tesla', 'Guglielmo Marconi'], answer: 'Alexander Graham Bell' },
    { question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Color Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets'], answer: 'Cascading Style Sheets' },
    { question: 'Who wrote the book "The Origin of Species"?', options: ['Charles Darwin', 'Albert Einstein', 'Isaac Newton', 'Nikola Tesla'], answer: 'Charles Darwin' },
    { question: 'In which year did World War II end?', options: ['1940', '1945', '1950', '1939'], answer: '1945' },
    { question: 'Which programming language is known as the mother of all languages?', options: ['C', 'Fortran', 'Assembly', 'Java'], answer: 'C' },
    { question: 'Who is the CEO of Tesla as of 2024?', options: ['Elon Musk', 'Jeff Bezos', 'Bill Gates', 'Mark Zuckerberg'], answer: 'Elon Musk' },
    { question: 'What is the capital of Japan?', options: ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido'], answer: 'Tokyo' },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setQuizCompleted(true);
    // Save user score
    setUsers([
      ...users,
      { name: userName, score: calculatedScore },
    ]);
  };

  return (
    <div className="quiz-container">
      {quizCompleted ? (
        <div className="quiz-result">
          <h2>Thanks for completing the quiz, {userName}!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={() => window.location.reload()}>Thanks</button>
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="option">
                <input
  type="radio"
  id={`question-${currentQuestionIndex}-option-${index}`} // Correct use of template literals
  name={`question-${currentQuestionIndex}`} // Correct use of template literals
  value={option}
  checked={answers[currentQuestionIndex] === option}
  onChange={() => handleAnswerChange(currentQuestionIndex, option)}
/>
<label htmlFor={`question-${currentQuestionIndex}-option-${index}`}> {/* Correct use of template literals */}
  {String.fromCharCode(65 + index)}. {option} {/* A, B, C, D */}
</label>
              </div>
            ))}
          </div>
          <div className="quiz-navigation">
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNext}>Next Question</button>
            ) : (
              <button onClick={handleSubmit}>Submit Quiz</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;