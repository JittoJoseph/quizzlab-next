import { GoogleGenerativeAI } from "@google/generative-ai";
import { Quiz } from '@/types';

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

async function generateWithModel(modelName: string, prompt: string): Promise<string> {
	console.log(`Attempting generation with ${modelName}`);
	const startTime = Date.now();
	const apiKey = process.env.GOOGLE_API_KEY;
	if (!apiKey) {
		throw new AIServiceError('Google API key is not configured');
	}
	const genAI = new GoogleGenerativeAI(apiKey);
	const model = genAI.getGenerativeModel({ model: modelName });

	const result = await fetchWithTimeout(
		model.generateContent(prompt),
		REQUEST_TIMEOUT
	);

	console.log(`${modelName} took ${(Date.now() - startTime) / 1000}s`);

	if (!result?.response) {
		throw new AIServiceError('No response from AI');
	}

	return result.response.text();
}

function shuffleOptions(question: any) {
	const optionsWithIndex = question.options.map((text: string, index: number) => ({
		text,
		isCorrect: index === question.correct,
	}));

	for (let i = optionsWithIndex.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
	}

	question.options = optionsWithIndex.map((opt: { text: string; isCorrect: boolean }) => opt.text);
	question.correct = optionsWithIndex.findIndex((opt: { text: string; isCorrect: boolean }) => opt.isCorrect);

	return question;
}

export async function generateQuizContent(topic: string, difficulty: string): Promise<Quiz> {
	try {
		if (!process.env.GOOGLE_API_KEY) {
			throw new Error('Google API key is not configured');
		}

		const prompt = `Generate 10 multiple choice questions about ${topic} at ${difficulty} level.

Format as JSON:
{
  "questions": [
    {
      "question": "Question text?",
      "options": ["Correct", "Wrong1", "Wrong2", "Wrong3"],
      "correct": 0
    }
  ]
}

Rules:
- Exactly 4 options per question
- correct must be 0-3 matching the correct option's position
- All options must be simple strings
- One correct answer per question`;

		console.log('Starting question generation...');
		const text = await generateWithModel("gemini-1.5-flash", prompt);

		const processedText = text
			.replace(/[\u201C\u201D\u2018\u2019]/g, '"')
			.replace(/```json\s*|\s*```/g, '')
			.replace(/\n/g, '')
			.replace(/,\s*([}\]])/g, '$1')
			.replace(/([{,]\s*)(\w+)(:)/g, '$1"$2"$3')
			.replace(/\[\s*\[(.*?)\]\s*,/g, '["$1",')
			.trim();

		if (!processedText.startsWith('{') || !processedText.endsWith('}')) {
			throw new QuestionGenerationError('Invalid JSON structure in AI response');
		}

		try {
			const parsed = JSON.parse(processedText);

			if (!parsed.questions?.length) {
				throw new QuestionGenerationError('No questions in AI response');
			}

			parsed.questions = parsed.questions.map((q: any, index: number) => {
				if (!Array.isArray(q.options) || q.options.length !== 4) {
					throw new QuestionGenerationError(`Invalid options array in question ${index + 1}`);
				}

				q.options = q.options.map((opt: any) => {
					if (Array.isArray(opt)) {
						return opt[0] || '';
					}
					return String(opt);
				});

				if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) {
					throw new QuestionGenerationError(`Invalid correct answer index in question ${index + 1}`);
				}

				return shuffleOptions(q);
			});

			return parsed as Quiz;

		} catch (parseError) {
			console.error('JSON Parse Error:', parseError);
			console.error('Processed Text:', processedText);
			throw new QuestionGenerationError(`Invalid JSON format: ${(parseError as Error).message}`);
		}

	} catch (error) {
		console.error('Generation error:', error);
		throw error;
	}
}