import React from 'react';

interface QuizInterfaceProps {
  question: string;
  options: string[];
  onNext: () => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ question, options, onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-blue-600">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{question}</h2>
        <div className="flex flex-col">
          {options.map((option, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white rounded-md py-2 mb-2 hover:bg-blue-600 transition"
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={onNext}
          className="mt-4 bg-blue-500 text-white rounded-md py-2 w-full hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizInterface;