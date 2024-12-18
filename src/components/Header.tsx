import Link from 'next/link';

export default function Header({ score, total }: { score?: number; total?: number }) {
	return (
		<header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
			<Link href="/" className="text-xl font-bold text-primary">
				QuizzLab
			</Link>
			{score !== undefined && (
				<div className="text-lg font-medium">
					{score}/{total}
				</div>
			)}
		</header>
	);
}