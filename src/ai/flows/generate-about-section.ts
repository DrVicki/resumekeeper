'use server';
/**
 * @fileOverview A Genkit flow that generates an "About Me" paragraph and a short bio based on user profile details.
 *
 * - generateAboutSection - A function that handles the generation of the about section content.
 * - GenerateAboutSectionInput - The input type for the generateAboutSection function.
 * - GenerateAboutSectionOutput - The return type for the generateAboutSection function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BasicInfoSchema = z.object({
  name: z.string().optional().describe('The user\'s full name.'),
  title: z.string().optional().describe('The user\'s professional title or desired role.'),
  location: z.string().optional().describe('The user\'s current location.'),
});

const ExperienceSchema = z.object({
  title: z.string().describe('Job title.'),
  company: z.string().describe('Company name.'),
  startDate: z.string().describe('Start date of employment (e.g., "January 2020").'),
  endDate: z.string().optional().describe('End date of employment (e.g., "December 2022" or "Present").'),
  responsibilities: z.array(z.string()).min(3).max(3).describe('Exactly 3 key responsibilities or achievements.'),
});

const EducationSchema = z.object({
  degree: z.string().describe('Degree obtained (e.g., "Master of Science").'),
  institution: z.string().describe('Name of the educational institution.'),
  startDate: z.string().describe('Start date of education (e.g., "September 2018").'),
  endDate: z.string().optional().describe('End date of education (e.g., "May 2020" or "Present").'),
});

const GenerateAboutSectionInputSchema = z.object({
  basics: BasicInfoSchema.optional().describe('User\'s basic profile information.'),
  experience: z.array(ExperienceSchema).optional().describe('List of user\'s work experiences.'),
  education: z.array(EducationSchema).optional().describe('List of user\'s educational background.'),
});
export type GenerateAboutSectionInput = z.infer<typeof GenerateAboutSectionInputSchema>;

const GenerateAboutSectionOutputSchema = z.object({
  aboutParagraph: z.string().describe('A professional "About Me" paragraph, 80-120 words long.'),
  shortBio: z.string().describe('A concise 1-2 sentence short biography.'),
});
export type GenerateAboutSectionOutput = z.infer<typeof GenerateAboutSectionOutputSchema>;

export async function generateAboutSection(input: GenerateAboutSectionInput): Promise<GenerateAboutSectionOutput> {
  return generateAboutSectionFlow(input);
}

const aboutSectionPrompt = ai.definePrompt({
  name: 'aboutSectionPrompt',
  input: { schema: GenerateAboutSectionInputSchema },
  output: { schema: GenerateAboutSectionOutputSchema },
  prompt: `You are an expert resume writer. Your task is to craft a compelling "About Me" paragraph and a short bio based on the provided profile details.

Instructions:
1.  **About Me Paragraph**: Generate a professional, engaging "About Me" paragraph that is between 80 and 120 words. Focus on the user's professional journey, key skills, and aspirations. Integrate information from their basic info, experience, and education.
2.  **Short Bio**: Create a concise 1-2 sentence short biography that can be used as a tagline or quick introduction. This should capture the essence of their professional identity.

Profile Details:

{{#if basics}}
Basic Information:
Name: {{{basics.name}}}
Title: {{{basics.title}}}
Location: {{{basics.location}}}
{{/if}}

{{#if experience}}
Experience:
{{#each experience}}
- Title: {{{this.title}}} at {{{this.company}}}
  Duration: {{{this.startDate}}}{{#if this.endDate}} - {{{this.endDate}}}{{/if}}
  Responsibilities: {{#each this.responsibilities}} "{{{this}}}"{{/each}}
{{/each}}
{{/if}}

{{#if education}}
Education:
{{#each education}}
- Degree: {{{this.degree}}} from {{{this.institution}}}
  Duration: {{{this.startDate}}}{{#if this.endDate}} - {{{this.endDate}}}{{/if}}
{{/each}}
{{/if}}

Generate the output in JSON format, strictly adhering to the specified schemas for 'aboutParagraph' and 'shortBio'.`,
});

const generateAboutSectionFlow = ai.defineFlow(
  {
    name: 'generateAboutSectionFlow',
    inputSchema: GenerateAboutSectionInputSchema,
    outputSchema: GenerateAboutSectionOutputSchema,
  },
  async (input) => {
    const { output } = await aboutSectionPrompt(input);
    return output!;
  },
);
