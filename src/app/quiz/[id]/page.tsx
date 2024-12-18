'use client';

import { useState } from 'react';

interface Option {
	id: string;
	text: string;
}

interface Question {
	id: number;
	question: string;
	options: Option[];
}

export default function QuizPage({ params }: { params: { id: string } }) {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const questions: Question[] = [
		{
			id: 1,
			question: "What is the capital of France?",
			options: [
				{ id: "a", text: "London" },
				{ id: "b", text: "Paris" },
				{ id: "c", text: "Berlin" },
				{ id: "d", text: "Madrid" }
			]
		}
		// Add more questions here
	];

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(prev => prev + 1);
			setSelectedOption(null);
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center bg-secondary p-4">
			<div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
				<div className="mb-8">
					<h2 className="text-2xl font-semibold text-primary mb-6">
						{questions[currentQuestion].question}
					</h2>
					<div className="space-y-4">
						{questions[currentQuestion].options.map((option) => (
							<button
								key={option.id}
								onClick={() => setSelectedOption(option.id)}
								className={`w-full text-left p-4 rounded-lg border ${selectedOption === option.id
										? 'bg-primary text-white'
										: 'bg-white text-primary hover:bg-blue-50'
									}`}
							>
								{option.text}
							</button>
						))}
					</div>
				</div>
				<div className="flex justify-end">
					<button
						onClick={handleNext}
						className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors"
					>
						Next
					</button>
				</div>
			</div>
		</main>
	);
}