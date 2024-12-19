export const metadata = {
	title: 'Quiz Page',
	description: 'Take your quiz',
};

export default function QuizLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{children}
		</>
	);
}