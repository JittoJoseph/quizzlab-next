'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SetupPage() {
	const router = useRouter();
	const [topic, setTopic] = useState('');
	const [difficulty, setDifficulty] = useState('Beginner');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!topic.trim()) {
			alert('Please enter a topic');
			return;
		}

		setLoading(true);
		try {
			const response = await fetch('/api/quiz', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ topic, difficulty })
			});

			if (!response.ok) {
				const errorData = await response.json();
				alert(errorData.error || 'An error occurred');
				setLoading(false);
				return;
			}

			const data = await response.json();
			localStorage.setItem('quizData', JSON.stringify(data.quiz.questions));
			router.push('/quiz/1');
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while generating the quiz');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
			<header className="w-full bg-white shadow-sm py-4">
				<div className="container mx-auto px-6">
					<Link
						href="/"
						className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
					>
						QuizzLab
					</Link>
				</div>
			</header>

			<main className="flex-grow flex items-center justify-center p-6">
				<div className="w-full max-w-md">
					<div className="bg-white rounded-xl p-8 shadow-lg">
						<h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
							Setup Your Quiz
						</h1>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="space-y-2">
								<label htmlFor="topic" className="block text-blue-800 font-medium">
									Topic
								</label>
								<input
									id="topic"
									type="text"
									value={topic}
									onChange={(e) => setTopic(e.target.value)}
									className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Enter quiz topic..."
									disabled={loading}
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="difficulty" className="block text-blue-800 font-medium">
									Difficulty
								</label>
								<select
									id="difficulty"
									value={difficulty}
									onChange={(e) => setDifficulty(e.target.value)}
									className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
									disabled={loading}
								>
									{['Beginner', 'Intermediate', 'Advanced'].map((level) => (
										<option key={level} value={level}>
											{level}
										</option>
									))}
								</select>
							</div>

							<button
								type="submit"
								disabled={loading}
								className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg 
                  hover:bg-blue-700 transition-all hover:-translate-y-0.5 
                  font-medium shadow-lg hover:shadow-xl disabled:opacity-50 
                  disabled:cursor-not-allowed disabled:hover:translate-y-0"
							>
								{loading ? 'Generating Quiz...' : 'Generate Quiz'}
							</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}