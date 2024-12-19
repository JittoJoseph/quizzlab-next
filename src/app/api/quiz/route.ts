import { generateQuizContent, QuestionGenerationError, AIServiceError } from '@/lib/ai-service';
import { NextResponse } from 'next/server';

interface QuizRequest {
	topic: string;
	difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export async function POST(request: Request) {
	try {
		const body = await request.json() as QuizRequest;

		if (!body.topic?.trim() || !body.difficulty?.trim()) {
			return NextResponse.json(
				{ error: "Topic and difficulty are required" },
				{ status: 400 }
			);
		}

		const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'] as const;
		if (!validDifficulties.includes(body.difficulty)) {
			return NextResponse.json(
				{ error: "Invalid difficulty level" },
				{ status: 400 }
			);
		}

		const quizContent = await generateQuizContent(body.topic, body.difficulty);
		return NextResponse.json(quizContent);

	} catch (error) {
		console.error("Quiz generation failed:", error);

		return NextResponse.json(
			{ error: "Failed to generate quiz questions" },
			{ status: 500 }
		);
	}
}