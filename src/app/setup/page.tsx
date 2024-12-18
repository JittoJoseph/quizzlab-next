'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
	const router = useRouter();
	const [topic, setTopic] = useState('');
	const [difficulty, setDifficulty] = useState('Beginner');
	const [loading, setLoading] = useState(false);

	const handleGenerateQuiz = async () => {
		if (!topic.trim()) {
			alert('Please enter a topic');
			return;
		}

		setLoading(true);
		try {
			// Here you would make an API call to generate quiz
			await new Promise(resolve => setTimeout(resolve, 1500));
			router.push('/quiz');
		} catch (error) {
			console.error('Failed to generate quiz:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center bg-secondary">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
				<h1 className="text-3xl font-bold text-primary text-center mb-6">Quiz Setup</h1>
				<input
					type="text"
					placeholder="Enter topic (e.g., 'World History', 'Python Programming')"
					value={topic}
					onChange={(e) => setTopic(e.target.value)}
					className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
					disabled={loading}
				/>
				<select
					value={difficulty}
					onChange={(e) => setDifficulty(e.target.value)}
					className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
					disabled={loading}
				>
					<option value="Beginner">Beginner</option>
					<option value="Intermediate">Intermediate</option>
					<option value="Advanced">Advanced</option>
				</select>
				<button
					onClick={handleGenerateQuiz}
					disabled={loading}
					className={`w-full bg-primary text-secondary p-3 rounded-lg transition-colors
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-900'}`}
				>
					{loading ? 'Generating Quiz...' : 'Generate Quiz'}
				</button>
			</div>
		</main>
	);
}