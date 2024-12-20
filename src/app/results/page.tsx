'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResultsPage() {
	const router = useRouter();
	const [score, setScore] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const finalScore = parseInt(localStorage.getItem('quizScore') || '0');
		const quizData = JSON.parse(localStorage.getItem('quizData') || '[]');
		setScore(finalScore);
		setTotal(quizData.length);
	}, []);

	const handlePlayAgain = () => {
		localStorage.removeItem('quizScore');
		localStorage.removeItem('quizData');
		router.push('/setup');
	};

	const handleBackHome = () => {
		localStorage.removeItem('quizScore');
		localStorage.removeItem('quizData');
		router.push('/');
	};

	return (
		<main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-6">
			<div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
				<h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Quiz Complete!</h1>

				<div className="text-center mb-8">
					<div className="text-6xl font-bold text-blue-600 mb-2">
						{score}/{total}
					</div>
					<p className="text-gray-600">
						{score === total ? 'Perfect Score!' :
							score >= total * 0.8 ? 'Great job!' :
								score >= total * 0.6 ? 'Good effort!' : 'Keep practicing!'}
					</p>
				</div>

				<div className="space-y-4">
					<button
						onClick={handlePlayAgain}
						className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg 
							hover:bg-blue-700 transition-all hover:-translate-y-0.5 
							font-medium shadow-lg hover:shadow-xl"
					>
						Play Again
					</button>
					<button
						onClick={handleBackHome}
						className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 
							rounded-lg hover:bg-blue-50 transition-all font-medium"
					>
						Back to Home
					</button>
				</div>
			</div>
		</main>
	);
}