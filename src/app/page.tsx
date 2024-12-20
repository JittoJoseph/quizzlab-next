'use client';

import Link from 'next/link';

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
			<div className="flex-grow container mx-auto px-6 flex items-center justify-center">
				<div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto py-8">
					{/* Content Section */}
					<div className="space-y-8 flex flex-col items-center text-center">
						<div className="space-y-6">
							<h1 className="text-5xl md:text-7xl font-bold text-blue-700">
								Quizzlab
							</h1>
							<p className="text-xl text-blue-800/80 max-w-xl">
								AI-Powered Dynamic Quiz Generator. Create personalized quizzes on any topic instantly.
							</p>
						</div>

						{/* Feature List */}
						<div className="space-y-4 text-blue-800/90 w-full max-w-md mx-auto">
							{[
								"Adaptive Learning Experience",
								"Smart Question Generation",
								"Instant Results & Analytics"
							].map((feature, index) => (
								<div key={index} className="flex items-center gap-3 justify-center">
									<span className="h-3 w-3 rounded-full bg-blue-400"></span>
									<span className="text-lg font-medium">{feature}</span>
								</div>
							))}
						</div>

						{/* CTA Button */}
						<div className="flex justify-center w-full">
							<Link
								href="/setup"
								className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg 
                  hover:bg-blue-700 transition-all hover:-translate-y-0.5 font-medium 
                  shadow-lg hover:shadow-xl"
							>
								Start Your Journey
							</Link>
						</div>
					</div>

					{/* Simple Visual Section */}
					<div className="relative max-w-sm mx-auto w-full">
						<div className="bg-white rounded-xl p-4 shadow-lg">
							<div className="space-y-4">
								<div className="h-2 bg-blue-100 rounded-full w-3/4"></div>
								<div className="grid grid-cols-2 gap-3">
									{[...Array(4)].map((_, i) => (
										<div
											key={i}
											className="h-12 bg-blue-50 rounded-lg border-2 border-blue-100"
										></div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<footer className="w-full bg-blue-200 py-4 mt-auto border-t border-blue-300">
				<a
					href="https://www.linkedin.com/in/jittojoseph17/"
					target="_blank"
					rel="noopener noreferrer"
					className="block text-center text-sm text-blue-800/80 hover:text-blue-600 transition-colors"
				>
					© {new Date().getFullYear()} Jitto Joseph
				</a>
			</footer>
		</main>
	);
}