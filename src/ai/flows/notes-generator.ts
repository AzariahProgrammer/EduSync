
'use server';
/**
 * @fileOverview Provides an AI-powered notes generator.
 *
 * - generateNotes - A function that creates "flip-style" notes for a given topic.
 * - NotesInput - The input type for the generateNotes function.
 * - NotesOutput - The return type for the generateNotes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NotesInputSchema = z.object({
  subject: z.string().describe('The main subject area (e.g., Mathematics, History).'),
  topic: z.string().describe('The specific topic within the subject for which to generate notes.'),
  notesCount: z.number().int().min(1).max(20).default(5).describe('The number of notes/flashcards to generate.'),
  imageUrls: z.array(z.string().url()).optional().describe('An optional list of image data URIs to use as a source for the notes.'),
});
export type NotesInput = z.infer<typeof NotesInputSchema>;

const NotesOutputSchema = z.object({
  notes: z.array(
    z.object({
      term: z.string().describe('A key term, concept, or question.'),
      definition: z.string().describe('The corresponding definition, explanation, or answer.'),
    })
  ).describe('A list of key terms and their definitions, suitable for flip notes or flashcards.'),
});
export type NotesOutput = z.infer<typeof NotesOutputSchema>;

export async function generateNotes(input: NotesInput): Promise<NotesOutput> {
  return notesGeneratorFlow(input);
}

const notesGeneratorPrompt = ai.definePrompt({
  name: 'notesGeneratorPrompt',
  input: { schema: NotesInputSchema },
  output: { schema: NotesOutputSchema },
  prompt: `You are an expert educator specializing in creating concise study materials for the South African school curriculum.
  Your task is to generate "flip notes" or flashcard-style notes for the given subject and topic.
  
  Generate exactly {{{notesCount}}} notes.

  Subject: {{{subject}}}
  Topic: {{{topic}}}
  
  {{#if imageUrls}}
  Use the information from the following image(s) as the primary source material. The topic provides context.
  {{#each imageUrls}}
  - Image: {{media url=this}}
  {{/each}}
  {{else}}
  Use your general knowledge for the given subject and topic.
  {{/if}}

  Generate a list of {{{notesCount}}} key terms, concepts, or questions and their corresponding definitions or explanations.
  The "term" should be what's on the front of the flashcard, and the "definition" should be on the back.
  Keep the definitions clear, concise, and easy to understand for a student.
  Focus on the most important information.
  `,
});

const notesGeneratorFlow = ai.defineFlow(
  {
    name: 'notesGeneratorFlow',
    inputSchema: NotesInputSchema,
    outputSchema: NotesOutputSchema,
  },
  async (input) => {
    const { output } = await notesGeneratorPrompt(input);
    return output!;
  }
);
