
'use server';
/**
 * @fileOverview Provides AI-powered feedback on quiz performance.
 *
 * - generateFeedback - A function that analyzes incorrect answers and provides improvement suggestions.
 * - QuizFeedbackInput - The input type for the generateFeedback function.
 * - QuizFeedbackOutput - The return type for the generateFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const IncorrectAnswerSchema = z.object({
  questionText: z.string(),
  userAnswer: z.string(),
  correctAnswer: z.string(),
  explanation: z.string(),
});

const QuizFeedbackInputSchema = z.object({
  subject: z.string().describe('The subject of the quiz (e.g., Mathematics).'),
  topic: z.string().describe('The topic of the quiz (e.g., Algebra).'),
  incorrectAnswers: z.array(IncorrectAnswerSchema).describe('A list of questions the user answered incorrectly.'),
});
export type QuizFeedbackInput = z.infer<typeof QuizFeedbackInputSchema>;

const QuizFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Personalized feedback and advice for the learner based on their incorrect answers.'),
});
export type QuizFeedbackOutput = z.infer<typeof QuizFeedbackOutputSchema>;


export async function generateFeedback(input: QuizFeedbackInput): Promise<QuizFeedbackOutput> {
  return quizFeedbackFlow(input);
}

const quizFeedbackPrompt = ai.definePrompt({
  name: 'quizFeedbackPrompt',
  input: { schema: QuizFeedbackInputSchema },
  output: { schema: QuizFeedbackOutputSchema },
  prompt: `You are an expert tutor for the South African school curriculum. Your task is to provide constructive, encouraging, and actionable feedback to a learner based on their incorrect answers in a quiz.

  Subject: {{{subject}}}
  Topic: {{{topic}}}

  The learner made the following mistakes:
  {{#each incorrectAnswers}}
  - Question: "{{this.questionText}}"
    - Their Answer: "{{this.userAnswer}}"
    - Correct Answer: "{{this.correctAnswer}}"
    - Explanation: "{{this.explanation}}"
  {{/each}}

  Analyze the pattern of errors. Identify the core concepts the learner seems to be struggling with.
  
  Provide a summary of where they went wrong and what they should focus on to improve.
  Keep the tone positive and encouraging. Frame the feedback as a guide to success, not a criticism of failure.
  Address the learner directly (e.g., "It looks like you're on the right track, but...").
  The feedback should be a single block of text.
  `,
});

const quizFeedbackFlow = ai.defineFlow(
  {
    name: 'quizFeedbackFlow',
    inputSchema: QuizFeedbackInputSchema,
    outputSchema: QuizFeedbackOutputSchema,
  },
  async (input) => {
    // If there are no incorrect answers, return a positive message without calling the AI.
    if (input.incorrectAnswers.length === 0) {
      return { feedback: "Excellent work! You answered all questions correctly. Keep up the great momentum!" };
    }
    const { output } = await quizFeedbackPrompt(input);
    return output!;
  }
);
