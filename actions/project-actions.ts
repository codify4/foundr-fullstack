'use server'

import { eq } from 'drizzle-orm';
import { project, InsertProject, SelectProject } from '@/db/schemas/page-schema';
import { db } from '@/db/drizzle';

export async function createProject(data: InsertProject): Promise<SelectProject> {
  const [newProject] = await db.insert(project).values(data).returning();
  return newProject;
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