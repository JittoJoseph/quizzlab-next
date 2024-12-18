import { GoogleGenerativeAI } from "@google/generative-ai";

export interface QuizQuestion {
	question: string;
	options: string[];
	correctAnswer: number;
}

export interface QuizResponse {
	questions: QuizQuestion[];
}

export class AIServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'AIServiceError';
	}
}

export class QuestionGenerationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'QuestionGenerationError';
	}
}

const REQUEST_TIMEOUT = 13000;

export async function fetchWithTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
	return Promise.race([
		promise,
		new Promise<never>((_, reject) =>
			setTimeout(() => reject(new AIServiceError('Request timeout')), timeout)
		)
	]);
}

export async function generateQuizContent(topic: string, difficulty: string): Promise<QuizResponse> {
	if (!process.env.GOOGLE_API_KEY) {
		throw new AIServiceError('Missing API key');
	}

	const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

	const prompt = `Generate a quiz about ${topic} at ${difficulty} level with 10 multiple choice questions.
    Return only valid JSON without markdown formatting or code blocks, following this exact structure:
    {
      "questions": [
        {
          "question": "Question text here?",
          "options": ["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],
          "correctAnswer": 0
        }
      ]
    }`;

	try {
		const result = await fetchWithTimeout(
			model.generateContent(prompt),
			REQUEST_TIMEOUT
		);

		const text = result.response.text();
		// Clean the response text of any markdown or code block syntax
		const cleanJSON = text.replace(/```json\n|\n```|```/g, '').trim();

		try {
			const parsed = JSON.parse(cleanJSON);

			// Validate response structure
			if (!parsed.questions || !Array.isArray(parsed.questions)) {
				throw new QuestionGenerationError('Invalid quiz format');
			}

			return parsed as QuizResponse;
		} catch (parseError) {
			throw new QuestionGenerationError('Invalid JSON response from AI');
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new QuestionGenerationError(`Generation failed: ${error.message}`);
		}
		throw new QuestionGenerationError('Failed to generate quiz');
	}
}