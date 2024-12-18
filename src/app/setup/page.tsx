import React, { useState } from 'react';

const SetupPage = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');

  const handleGenerateQuiz = () => {
    // Logic to generate quiz goes here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-blue-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Quiz Setup</h1>
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button
          onClick={handleGenerateQuiz}
          className="bg-blue-500 text-white rounded p-2 w-full"
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
};

export default SetupPage;