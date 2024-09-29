'use server'

import { eq } from 'drizzle-orm';
import { project, InsertProject, SelectProject, page } from '@/db/schemas/page-schema';
import { db } from '@/db/drizzle';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { getAuthenticatedUser } from '@/lib/get-session';

export async function createProject(data: InsertProject): Promise<SelectProject> {
  try {
    await getAuthenticatedUser();
    const [newProject] = await db.insert(project).values(data).returning();
    revalidatePath("/dashboard");
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

export async function getProjectByPageSlug(slug: string): Promise<SelectProject[]> {
  try {
    const [foundPage] = await db
      .select()
      .from(page)
      .where(eq(page.pageSlug, slug));

    if (!foundPage) {
      console.error("No page found for slug:", slug);
      return [];
    }

    return await db
      .select()
      .from(project)
      .where(eq(project.pageId, foundPage.id))
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
    revalidatePath("/dashboard");
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
      revalidatePath("/dashboard");
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
}