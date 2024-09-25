'use server'

import { eq } from 'drizzle-orm';
import { page, socialLink, project, InsertPage, InsertSocial, InsertProject, SelectPage, SelectSocial, SelectProject } from '@/db/schemas/page-schema';
import { db } from '@/db/drizzle';

// Page functions
export async function createPage(data: InsertPage): Promise<SelectPage> {
  const [newPage] = await db.insert(page).values(data).returning();
  return newPage;
}

export async function getPageById(id: number): Promise<SelectPage | undefined> {
  const [foundPage] = await db.select().from(page).where(eq(page.id, id));
  return foundPage;
}

export async function getPageBySlug(slug: string): Promise<SelectPage | undefined> {
  const [foundPage] = await db.select().from(page).where(eq(page.pageSlug, slug));
  return foundPage;
}

export async function updatePage(id: number, data: Partial<InsertPage>): Promise<SelectPage | undefined> {
  const [updatedPage] = await db.update(page).set(data).where(eq(page.id, id)).returning();
  return updatedPage;
}

export async function deletePage(id: number): Promise<void> {
  await db.delete(page).where(eq(page.id, id));
}

// Social Link functions
export async function createSocialLink(data: InsertSocial): Promise<SelectSocial> {
  const [newSocialLink] = await db.insert(socialLink).values(data).returning();
  return newSocialLink;
}

export async function getSocialLinkById(id: number): Promise<SelectSocial | undefined> {
  const [foundSocialLink] = await db.select().from(socialLink).where(eq(socialLink.id, id));
  return foundSocialLink;
}

export async function getSocialLinksByPageId(pageId: number): Promise<SelectSocial[]> {
  return db.select().from(socialLink).where(eq(socialLink.pageId, pageId));
}

export async function updateSocialLink(id: number, data: Partial<InsertSocial>): Promise<SelectSocial | undefined> {
  const [updatedSocialLink] = await db.update(socialLink).set(data).where(eq(socialLink.id, id)).returning();
  return updatedSocialLink;
}

export async function deleteSocialLink(id: number): Promise<void> {
  await db.delete(socialLink).where(eq(socialLink.id, id));
}

// Project functions
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

// Additional utility functions

export async function getPageWithRelations(slug: string): Promise<(SelectPage & { socials: SelectSocial[], projects: SelectProject[] }) | undefined> {
  const pageResult = await db
    .select()
    .from(page)
    .where(eq(page.pageSlug, slug))
    .limit(1);

  if (pageResult.length === 0) return undefined;

  const pageData = pageResult[0];

  const socials = await db
    .select()
    .from(socialLink)
    .where(eq(socialLink.pageId, pageData.id));

  const projects = await db
    .select()
    .from(project)
    .where(eq(project.pageId, pageData.id));

  return {
    ...pageData,
    socials,
    projects,
  };
}