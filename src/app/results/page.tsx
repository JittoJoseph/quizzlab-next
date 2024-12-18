'use client';

import { useRouter } from 'next/router';

export default function ResultsPage() {
	const router = useRouter();
	const result = JSON.parse(localStorage.getItem('quizResult') || '{}');
	const quizData = JSON.parse(localStorage.getItem('quizData') || '{}');

	return (
		<div className="min-h-screen bg-secondary flex items-center justify-center p-4">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold text-primary mb-6 text-center">Quiz Results</h1>

				<div className="text-center mb-8">
					<p className="text-4xl font-bold mb-4">
						{result.score}/{result.total}
					</p>
					<p className="text-gray-600">Topic: {quizData.topic}</p>
					<p className="text-gray-600">Difficulty: {quizData.difficulty}</p>
				</div>

				<div className="space-y-4">
					<button
						onClick={() => router.push('/setup')}
						className="w-full bg-primary text-white p-3 rounded-lg"
					>
						New Quiz
					</button>
					<button
						onClick={() => router.push('/')}
						className="w-full bg-secondary text-primary p-3 rounded-lg border border-primary"
					>
						Back to Home
					</button>
				</div>
			</div>
		</div>
	);
}