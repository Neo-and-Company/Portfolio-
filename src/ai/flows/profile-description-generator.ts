// src/ai/flows/profile-description-generator.ts
'use server';

/**
 * @fileOverview Generates professional descriptions for user profiles based on provided skills and job experiences.
 *
 * - generateProfileDescription - A function that takes skills and job experiences as input and returns a generated profile description.
 * - ProfileDescriptionInput - The input type for the generateProfileDescription function.
 * - ProfileDescriptionOutput - The return type for the generateProfileDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileDescriptionInputSchema = z.object({
  skills: z.string().describe('A comma-separated list of skills.'),
  jobExperiences: z.string().describe('A detailed description of job experiences.'),
});
export type ProfileDescriptionInput = z.infer<typeof ProfileDescriptionInputSchema>;

const ProfileDescriptionOutputSchema = z.object({
  profileDescription: z.string().describe('A professional and concise profile description generated from the provided skills and job experiences.'),
});
export type ProfileDescriptionOutput = z.infer<typeof ProfileDescriptionOutputSchema>;

export async function generateProfileDescription(input: ProfileDescriptionInput): Promise<ProfileDescriptionOutput> {
  return generateProfileDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'profileDescriptionPrompt',
  input: {schema: ProfileDescriptionInputSchema},
  output: {schema: ProfileDescriptionOutputSchema},
  prompt: `You are a professional resume writer. Generate a concise and professional profile description based on the following information. The description should be clear, engaging, and highlight the key skills and experiences. Focus on making the profile stand out to recruiters.

Skills: {{{skills}}}
Job Experiences: {{{jobExperiences}}}`,
});

const generateProfileDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProfileDescriptionFlow',
    inputSchema: ProfileDescriptionInputSchema,
    outputSchema: ProfileDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
