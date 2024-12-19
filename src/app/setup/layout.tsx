export const metadata = {
	title: 'Setup Page',
	description: 'Set up your quiz',
};

export default function SetupLayout({
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
