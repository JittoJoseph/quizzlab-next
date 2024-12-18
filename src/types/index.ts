// src/types/index.ts

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';