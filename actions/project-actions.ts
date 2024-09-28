'use server'

import { eq } from 'drizzle-orm';
import { project, InsertProject, SelectProject } from '@/db/schemas/page-schema';
import { db } from '@/db/drizzle';
import { auth } from '@/auth';

export async function createProject(projectData: Omit<InsertProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<SelectProject> {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error('You must be logged in to add a habit');
  }

  const userId = session.user.id;

  if (!userId || !projectData) {
    throw new Error('Missing required fields');
  }
  
  try {
    const [newProject] = await db.insert(project).values({...projectData }).returning();
    return newProject;
  } catch (error) {
    console.error('Error creating page:', error);
    throw error;
  }
}

  
export async function getProjectById(id: number): Promise<SelectProject | undefined> {
  const [foundProject] = await db.select().from(project).where(eq(project.id, id));
  return foundProject;
}

export async function getProjectsByPageId(pageId: number): Promise<SelectProject[]> {
  return db.select().from(project).where(eq(project.pageId, pageId));
}

export async function updateProject(id: number, data: Partial<InsertProject>): Promise<SelectProject | undefined> {
  const [updatedProject] = await db.update(project).set(data).where(eq(project.id, id)).returning();
  return updatedProject;
}

export async function deleteProject(id: number): Promise<void> {
  await db.delete(project).where(eq(project.id, id));
}