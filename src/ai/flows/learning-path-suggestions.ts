'use server';

/**
 * @fileOverview Provides AI-powered learning path suggestions based on user learning goals and activity.
 *
 * - suggestLearningPath - A function that generates learning path suggestions.
 * - LearningPathSuggestionsInput - The input type for the suggestLearningPath function.
 * - LearningPathSuggestionsOutput - The return type for the suggestLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LearningPathSuggestionsInputSchema = z.object({
  learningGoals: z
    .string()
    .describe('The users learning goals, e.g. learn react, get better at marketing'),
  userActivity: z
    .string()
    .describe(
      'A description of the users past activity within the learning platform, e.g. courses completed, time spent on each course'
    ),
});
export type LearningPathSuggestionsInput = z.infer<
  typeof LearningPathSuggestionsInputSchema
>;

const LearningPathSuggestionsOutputSchema = z.object({
  suggestedMaterials: z
    .array(z.object({
      title: z.string().describe("Title for the code example."),
      code: z.string().describe("The code example to be displayed to the user."),
    }))
    .describe('A list of learning materials suggested to the user, including code examples.'),
});
export type LearningPathSuggestionsOutput = z.infer<
  typeof LearningPathSuggestionsOutputSchema
>;

export async function suggestLearningPath(
  input: LearningPathSuggestionsInput
): Promise<LearningPathSuggestionsOutput> {
  return learningPathSuggestionsFlow(input);
}

const learningPathSuggestionsPrompt = ai.definePrompt({
  name: 'learningPathSuggestionsPrompt',
  input: {schema: LearningPathSuggestionsInputSchema},
  output: {schema: LearningPathSuggestionsOutputSchema},
  prompt: `You are a learning path suggestion expert. You will suggest learning materials to the user based on their learning goals and activity.

  Learning Goals: {{{learningGoals}}}
  User Activity: {{{userActivity}}}

  Suggest learning materials that will help the user achieve their learning goals, considering their past activity.
  Provide a list of at least 3 suggestions. Each suggestion must include a clear title and a relevant, useful code snippet.
  The code should be well-formatted and demonstrate a key concept. For example, if the goal is to learn React, provide a simple component example.
  `,
});

const learningPathSuggestionsFlow = ai.defineFlow(
  {
    name: 'learningPathSuggestionsFlow',
    inputSchema: LearningPathSuggestionsInputSchema,
    outputSchema: LearningPathSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await learningPathSuggestionsPrompt(input);
    return output!;
  }
);
