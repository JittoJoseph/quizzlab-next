import React, { useState } from 'react';

const QuizForm: React.FC<{ onGenerate: (topic: string, difficulty: string) => void }> = ({ onGenerate }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(topic, difficulty);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter quiz topic"
        className="border border-gray-300 rounded p-2"
        required
      />
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="border border-gray-300 rounded p-2"
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Generate Quiz
      </button>
    </form>
  );
};

export default QuizForm;