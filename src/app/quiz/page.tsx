'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QuizLoadingPage() {
	const router = useRouter();

	useEffect(() => {
		// Simulate quiz generation delay
		setTimeout(() => {
			router.push('/quiz/123'); // Replace with actual quiz ID
		}, 2000);
	}, [router]);

	return (
		<main className="min-h-screen flex items-center justify-center bg-secondary">
			<div className="text-center space-y-4">
				<h1 className="text-2xl font-semibold text-primary">Generating Your Quiz...</h1>
				<div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
			</div>
		</main>
	);
}