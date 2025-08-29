'use server';

/**
 * @fileOverview AI agent that generates a personalized learning statement based on the user's skills and projects.
 *
 * - generateLearningStatement - A function that generates the learning statement.
 * - GenerateLearningStatementInput - The input type for the generateLearningStatement function.
 * - GenerateLearningStatementOutput - The return type for the generateLearningStatement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLearningStatementInputSchema = z.object({
  skills: z
    .string()
    .describe('A list of skills the user possesses, separated by commas.'),
  projects: z
    .string()
    .describe(
      'A list of projects the user has worked on, separated by commas.'
    ),
});
export type GenerateLearningStatementInput = z.infer<
  typeof GenerateLearningStatementInputSchema
>;

const GenerateLearningStatementOutputSchema = z.object({
  statement: z
    .string()
    .describe('A personalized learning statement based on the user skills.'),
});
export type GenerateLearningStatementOutput = z.infer<
  typeof GenerateLearningStatementOutputSchema
>;

export async function generateLearningStatement(
  input: GenerateLearningStatementInput
): Promise<GenerateLearningStatementOutput> {
  return generateLearningStatementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLearningStatementPrompt',
  input: {schema: GenerateLearningStatementInputSchema},
  output: {schema: GenerateLearningStatementOutputSchema},
  prompt: `You are an AI assistant that helps users generate personalized learning statements.

  Based on the user's skills and projects, craft a concise and compelling statement that highlights their learning goals and aspirations.

  Skills: {{{skills}}}
  Projects: {{{projects}}}

  Learning Statement:`, // Keep the prompt short to minimize token usage
});

const generateLearningStatementFlow = ai.defineFlow(
  {
    name: 'generateLearningStatementFlow',
    inputSchema: GenerateLearningStatementInputSchema,
    outputSchema: GenerateLearningStatementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
