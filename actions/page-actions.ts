'use server'

import { eq } from 'drizzle-orm';
import { page, socialLink, project, InsertPage, SelectPage, SelectSocial, SelectProject } from '@/db/schemas/page-schema';
import { db } from '@/db/drizzle';

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