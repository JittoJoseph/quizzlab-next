'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import clsx from 'clsx';

interface Option {
	id: string;
	text: string;
}

interface Question {
	id: number;
	question: string;
	options: Option[];
	correctAnswer: number;
}

export default function QuizPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [score, setScore] = useState(0);
	const [quizData, setQuizData] = useState<Question[]>([]);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [showAnswer, setShowAnswer] = useState(false);
	const [isLastQuestion, setIsLastQuestion] = useState(false);

	useEffect(() => {
		const storedQuizData = JSON.parse(localStorage.getItem('quizData') || '[]');
		const currentQuestionNum = parseInt(searchParams.get('id') || '1');

		if (!storedQuizData.length) {
			router.push('/setup');
			return;
		}

		setQuizData(storedQuizData);
		setQuestionNumber(currentQuestionNum);
		setLoading(false);
	}, [searchParams, router]);

	const currentQuestion = quizData[questionNumber - 1];

	const handleOptionSelect = (optionIndex: number) => {
		if (showAnswer) return;
		setSelectedOption(optionIndex);
		setShowAnswer(true);
		if (optionIndex === currentQuestion.correctAnswer) {
			setScore(prev => prev + 1);
		}
	};

	const handleNext = () => {
		if (!showAnswer) return;

		if (isLastQuestion) {
			localStorage.setItem('quizResult', JSON.stringify({ score, total: quizData.length }));
			router.push('/results');
		} else {
			setSelectedOption(null);
			setShowAnswer(false);
			router.push(`/quiz/${questionNumber + 1}`);
		}
	};

	if (loading || !currentQuestion) return <div>Loading...</div>;

	return (
		<main className="min-h-screen bg-secondary">
			<Header score={score} total={quizData.length} />
			<div className="flex items-center justify-center p-4 h-screen">
				<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
					<h2 className="text-xl mb-4">Question {questionNumber}</h2>
					<p className="text-lg mb-6">{currentQuestion.question}</p>

					<div className="space-y-3">
						{currentQuestion.options.map((option, index) => (
							<button
								key={index}
								onClick={() => handleOptionSelect(index)}
								disabled={showAnswer}
								className={clsx(
									"w-full p-3 text-left rounded-lg transition-colors border",
									{
										'bg-green-100 border-green-500': showAnswer && index === currentQuestion.correctAnswer,
										'bg-red-100 border-red-500': showAnswer && selectedOption === index && index !== currentQuestion.correctAnswer,
										'hover:bg-gray-100': !showAnswer,
										'border-gray-200': !showAnswer && selectedOption !== index,
										'border-blue-500 bg-blue-50': !showAnswer && selectedOption === index
									}
								)}
							>
								{option.text}
							</button>
						))}
					</div>

					<button
						onClick={handleNext}
						disabled={!showAnswer}
						className={clsx(
							"w-full bg-primary text-white p-3 rounded-lg mt-6 transition-opacity",
							{
								'opacity-50 cursor-not-allowed': !showAnswer,
								'hover:bg-blue-900': showAnswer
							}
						)}
					>
						{isLastQuestion ? 'Finish Quiz' : 'Next Question'}
					</button>
				</div>
			</div>
		</main>
	);
}