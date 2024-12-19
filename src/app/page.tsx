'use client';

import { useState } from 'react';

export default function Home() {
	const [topic, setTopic] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [loading, setLoading] = useState(false);
	const [quizData, setQuizData] = useState(null);

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
			setQuizData(data);
		} catch (error) {
			console.error('Error fetching quiz data:', error);
			alert('An error occurred while generating the quiz');
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-secondary text-primary">
			<div className="text-center space-y-6">
				<h1 className="text-6xl font-bold">
					Quizzlab
				</h1>
				<p className="text-xl max-w-2xl mx-auto">
					AI-Powered Dynamic Quiz Generator. Create personalized quizzes on any topic instantly.
				</p>
				<div>
					<a
						href="/setup"
						className="inline-block px-6 py-3 bg-primary text-secondary rounded-lg hover:bg-blue-900 transition-colors"
					>
						Get Started
					</a>
				</div>
			</div>
		</main>
	);
}