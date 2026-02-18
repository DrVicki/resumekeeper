'use server';

import { revalidatePath } from 'next/cache';
import {
  addEducation as dbAddEducation,
  addExperience as dbAddExperience,
  addProject as dbAddProject,
  deleteEducation as dbDeleteEducation,
  deleteExperience as dbDeleteExperience,
  deleteProject as dbDeleteProject,
  getResumeData as dbGetResumeData,
  updateAbout as dbUpdateAbout,
  updateBasics as dbUpdateBasics,
  updateEducation as dbUpdateEducation,
  updateExperience as dbUpdateExperience,
  updateProject as dbUpdateProject,
} from './data';
import type { About, Basics, Education, Experience, Project } from './types';
import { generateAboutSection } from '@/ai/flows/generate-about-section';

export async function updateBasicsAction(data: Basics) {
  await dbUpdateBasics(data);
  revalidatePath('/profile');
  revalidatePath('/preview');
}

export async function updateAboutAction(data: About) {
  await dbUpdateAbout(data);
  revalidatePath('/profile');
  revalidatePath('/preview');
}

export async function generateAboutAction() {
  try {
    const resumeData = await dbGetResumeData();
    const { basics, experience, education } = resumeData;
    
    const result = await generateAboutSection({ basics, experience, education });

    if (result) {
      await dbUpdateAbout(result);
      revalidatePath('/profile');
      revalidatePath('/preview');
      return { success: true, data: result };
    }
    throw new Error('AI generation returned no data.');
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate content.' };
  }
}

export async function addExperienceAction(data: Omit<Experience, 'id'>) {
  await dbAddExperience(data);
  revalidatePath('/profile');
  revalidatePath('/preview');
}

export async function updateExperienceAction(data: Experience) {
  await dbUpdateExperience(data);
  revalidatePath('/profile');
  revalidatePath('/preview');
}

export async function deleteExperienceAction(id: string) {
  await dbDeleteExperience(id);
  revalidatePath('/profile');
  revalidatePath('/preview');
}

export async function addEducationAction(data: Omit<Education, 'id'>) {
  await dbAddEducation(data);
  revalidatePath('/profile');
  revalidatePath('/preview');
}

export async function updateEducationAction(data: Education) {
  await dbUpdateEducation(data);
  revalidatePath('/profile');
  revalidatePath('/preview');
}

export async function deleteEducationAction(id: string) {
  await dbDeleteEducation(id);
  revalidatePath('/profile');
  revalidatePath('/preview');
}

export async function addProjectAction(data: Omit<Project, 'id'>) {
  await dbAddProject(data);
  revalidatePath('/projects');
  revalidatePath('/preview');
}

export async function updateProjectAction(data: Project) {
  await dbUpdateProject(data);
  revalidatePath('/projects');
  revalidatePath('/preview');
}

export async function deleteProjectAction(id: string) {
  await dbDeleteProject(id);
  revalidatePath('/projects');
  revalidatePath('/preview');
}
