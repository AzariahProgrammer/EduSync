
'use server';
/**
 * @fileOverview Provides an AI-powered quiz generator.
 *
 * - generateQuiz - A function that creates a quiz based on a subject and topic.
 * - QuizInput - The input type for the generateQuiz function.
 * - QuizOutput - The return type for the generateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuizInputSchema = z.object({
  subject: z.string().describe('The main subject area (e.g., Mathematics, History).'),
  topic: z.string().describe('The specific topic within the subject for which to generate the quiz.'),
  questionCount: z.number().int().min(1).max(10).default(5).describe('The number of questions to generate.'),
  imageUrls: z.array(z.string().url()).optional().describe('An optional list of image data URIs to use as a source for the quiz.'),
  sourceText: z.string().optional().describe('An optional block of text (e.g., from notes) to use as the primary source for generating the quiz.'),
});
export type QuizInput = z.infer<typeof QuizInputSchema>;


const QuizOutputSchema = z.object({
  questions: z.array(
    z.object({
      questionText: z.string().describe('The text of the multiple-choice question.'),
      options: z.array(z.string()).describe('A list of possible answers, one of which is correct.'),
      correctAnswer: z.string().describe('The correct answer from the options list.'),
      explanation: z.string().describe('A brief explanation of why the correct answer is right.'),
    })
  ).describe('A list of generated quiz questions.'),
});
export type QuizOutput = z.infer<typeof QuizOutputSchema>;


export async function generateQuiz(input: QuizInput): Promise<QuizOutput> {
  return quizGeneratorFlow(input);
}

const quizGeneratorPrompt = ai.definePrompt({
  name: 'quizGeneratorPrompt',
  input: { schema: QuizInputSchema },
  output: { schema: QuizOutputSchema },
  prompt: `You are an expert educator and quiz creator specializing in the South African school curriculum. 
  Your task is to create a multiple-choice quiz based on the provided subject and topic.

  Subject: {{{subject}}}
  Topic: {{{topic}}}
  Number of Questions: {{{questionCount}}}
  
  {{#if sourceText}}
  Use the following text as the exclusive source material for the questions. The topic and subject provide context.
  ---
  {{{sourceText}}}
  ---
  {{else if imageUrls}}
  Use the information from the following image(s) as the primary source material for the questions. The topic provides context.
  {{#each imageUrls}}
  - Image: {{media url=this}}
  {{/each}}
  {{else}}
  Use your general knowledge for the given subject and topic.
  {{/if}}

  Generate exactly {{{questionCount}}} high-quality multiple-choice questions.
  Each question must have:
  1. A clear and concise question text.
  2. Four distinct options.
  3. A single correct answer, which must be one of the four options.
  4. A brief, clear explanation for the correct answer.

  Ensure the questions are relevant and appropriate for a student studying the South African curriculum.
  `,
});

const quizGeneratorFlow = ai.defineFlow(
  {
    name: 'quizGeneratorFlow',
    inputSchema: QuizInputSchema,
    outputSchema: QuizOutputSchema,
  },
  async (input) => {
    const { output } = await quizGeneratorPrompt(input);
    return output!;
  }
);
