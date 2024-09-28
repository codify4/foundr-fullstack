'use server'

import { eq } from 'drizzle-orm';
import { project, InsertProject, SelectProject, page } from '@/db/schemas/page-schema';
import { db } from '@/db/drizzle';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

// Helper function to get the authenticated user
async function getAuthenticatedUser() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Authentication required');
  }
  return session.user;
}

// Cached function to get a project by ID
export const getProjectById = async (id: number): Promise<SelectProject | null> => {
  try {
    const [foundProject] = await db
      .select()
      .from(project)
      .where(eq(project.id, id))
      .limit(1);
    return foundProject || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }
};

export async function createProject(data: InsertProject): Promise<SelectProject> {
  try {
    await getAuthenticatedUser();
    const [newProject] = await db.insert(project).values(data).returning();
    revalidatePath(`/projects/${newProject.pageId}`);
    return newProject;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
}

export async function getProjectsByPageId(pageId: number): Promise<SelectProject[]> {
  try {
    return db
      .select()
      .from(project)
      .where(eq(project.pageId, pageId))
      .orderBy(project.createdAt);
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

export async function updateProject(id: number, data: Partial<InsertProject>): Promise<SelectProject | null> {
  try {
    await getAuthenticatedUser();
    const [updatedProject] = await db
      .update(project)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(project.id, id))
      .returning();
    revalidatePath(`/projects/${updatedProject.pageId}`);
    return updatedProject || null;
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
}

export async function deleteProject(id: number): Promise<void> {
  try {
    const [deletedProject] = await db
      .delete(project)
      .where(eq(project.id, id))
      .returning();
    if (deletedProject) {
      revalidatePath(`/projects/${deletedProject.pageId}`);
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
}