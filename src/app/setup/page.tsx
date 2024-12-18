'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to generate quiz');
			}

			console.log(`Generated with ${data.metadata.model} in ${data.metadata.timeTaken}s`);
			localStorage.setItem('quizData', JSON.stringify(data.quiz));
			router.push('/quiz/1');
		} catch (error) {
			console.error('Failed to generate quiz:', error);
			alert(error instanceof Error ? error.message : 'Failed to generate quiz');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-secondary flex items-center justify-center p-4">
			<form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold text-primary mb-6 text-center">Create Quiz</h1>

				<input
					type="text"
					value={topic}
					onChange={(e) => setTopic(e.target.value)}
					placeholder="Enter quiz topic"
					className="w-full p-3 mb-4 border rounded-lg"
				/>

				<select
					value={difficulty}
					onChange={(e) => setDifficulty(e.target.value)}
					className="w-full p-3 mb-4 border rounded-lg"
				>
					<option value="Beginner">Beginner</option>
					<option value="Intermediate">Intermediate</option>
					<option value="Advanced">Advanced</option>
				</select>

				<button
					type="submit"
					disabled={loading}
					className={`w-full bg-primary text-white p-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
						}`}
				>
					{loading ? 'Generating Quiz...' : 'Generate Quiz'}
				</button>
			</form>
		</div>
	);
}