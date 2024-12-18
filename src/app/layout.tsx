import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Quizzlab - AI Quiz Generator",
	description: "Create personalized quizzes on any topic instantly with AI",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-secondary min-h-screen`}>
				<div className="container mx-auto px-4">
					{children}
				</div>
			</body>
		</html>
	);
}