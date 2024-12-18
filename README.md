# quizzlab/quizzlab/README.md

# Quizzlab

Quizzlab is an AI-Powered Dynamic Quiz Generator that allows users to create personalized quizzes on any topic instantly. This project is built using Next.js with TypeScript and styled with Tailwind CSS.

## Features

- **Landing Page**: Introduces the application with the title "Quizzlab" and a brief description.
- **Quiz Setup**: Users can enter a topic, select a difficulty level (Beginner, Intermediate, Advanced), and generate a quiz.
- **Quiz Interface**: Displays quiz questions with multiple-choice options and allows users to navigate through questions.

## Project Structure

```
quizzlab
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── quiz
│   │   │   ├── page.tsx
│   │   │   └── [id]
│   │   │       └── page.tsx
│   │   └── setup
│   │       └── page.tsx
│   ├── components
│   │   ├── QuizForm.tsx
│   │   ├── QuizInterface.tsx
│   │   └── QuizSetup.tsx
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── constants.ts
├── tailwind.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd quizzlab
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to see the application in action.

## License

This project is licensed under the MIT License.