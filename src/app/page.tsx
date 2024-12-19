'use client';

export default function Home() {

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