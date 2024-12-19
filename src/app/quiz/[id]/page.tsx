'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Question {
	id?: number;
	question: string;
	options: string[];
	correct: number;
}

export default function QuizPage() {
	const router = useRouter();
	const params = useParams();
	const [loading, setLoading] = useState(true);
	const [score, setScore] = useState(0);
	const [quizData, setQuizData] = useState<Question[]>([]);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [showAnswer, setShowAnswer] = useState(false);
	const [isLastQuestion, setIsLastQuestion] = useState(false);

	useEffect(() => {
		const storedQuizData = JSON.parse(localStorage.getItem('quizData') || 'null');
		const storedScore = parseInt(localStorage.getItem('quizScore') || '0');

		if (!storedQuizData) {
			router.push('/setup');
			return;
		}

		setQuizData(storedQuizData);
		setScore(storedScore);
		const currentQuestionNum = parseInt(Array.isArray(params.id) ? params.id[0] : params.id || '1') - 1;
		setQuestionNumber(currentQuestionNum);
		setIsLastQuestion(currentQuestionNum === storedQuizData.length - 1);
		setLoading(false);
	}, [params.id, router]);

	const handleOptionSelect = (index: number) => {
		setSelectedOption(index);
		setShowAnswer(true);
		if (index === quizData[questionNumber].correct) {
			const newScore = score + 1;
			setScore(newScore);
			localStorage.setItem('quizScore', newScore.toString());
		}
	};

	const handleNextQuestion = () => {
		if (isLastQuestion) {
			router.push('/results');
			return;
		}
		router.push(`/quiz/${questionNumber + 2}`);
	};

	if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;

	const currentQuestion = quizData[questionNumber];
	if (!currentQuestion) return null;

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
			{/* Fixed Header */}
			<div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-10">
				<div className="container mx-auto px-4 h-16 flex justify-between items-center">
					<button
						onClick={() => router.push('/')}
						className="text-2xl font-bold text-blue-600 hover:text-blue-700"
					>
						QuizzLab
					</button>
					<div className="text-blue-900 font-semibold">
						Score: {score}/{quizData.length}
					</div>
				</div>
			</div>

			{/* Main Content - Centered both horizontally and vertically */}
			<div className="flex-grow flex items-center justify-center p-4">
				<div className="w-full max-w-2xl">
					<div className="bg-white rounded-xl shadow-lg p-8">
						{/* Question Header */}
						<div className="flex justify-between items-center mb-6">
							<span className="text-blue-900 font-bold text-xl">
								Question {questionNumber + 1}/{quizData.length}
							</span>
						</div>

						{/* Question */}
						<h2 className="text-xl text-blue-900 font-medium mb-6">
							{currentQuestion.question}
						</h2>

						{/* Options */}
						<div className="space-y-3 mb-6">
							{currentQuestion.options.map((option, index) => (
								<button
									key={`question-${questionNumber}-option-${index}`}
									onClick={() => handleOptionSelect(index)}
									disabled={showAnswer}
									className={`w-full p-4 text-left rounded-lg border-2 transition-all text-gray-800
										${showAnswer && index === currentQuestion.correct
											? 'bg-green-50 border-green-500'
											: showAnswer && index === selectedOption
												? 'bg-red-50 border-red-500'
												: selectedOption === index
													? 'bg-blue-50 border-blue-500'
													: 'hover:bg-gray-50 border-gray-200'
										}
									`}
								>
									<span className="inline-block w-6 h-6 text-center mr-3 rounded-full bg-blue-100 text-blue-600">
										{String.fromCharCode(65 + index)}
									</span>
									<span className="text-gray-800">{option}</span>
									{showAnswer && (
										index === currentQuestion.correct ? (
											<span className="ml-2 text-green-600 font-bold">✓</span>
										) : index === selectedOption && (
											<span className="ml-2 text-red-600 font-bold">✗</span>
										)
									)}
								</button>
							))}
						</div>

						<div className="flex justify-end pt-6">
							<button
								onClick={handleNextQuestion}
								disabled={!showAnswer}
								className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
									transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLastQuestion ? 'Finish' : 'Next'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}