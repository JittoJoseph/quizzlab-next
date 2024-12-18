import React, { useState } from 'react';

const QuizSetup: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');

  const handleGenerateQuiz = () => {
    // Logic to generate quiz based on topic and difficulty
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-blue-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Quiz Setup</h2>
        <input
          type="text"
          placeholder="Enter quiz topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button
          onClick={handleGenerateQuiz}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSetup;