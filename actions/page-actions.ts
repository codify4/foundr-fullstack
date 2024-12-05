'use server'

import { eq } from 'drizzle-orm';
import { page, InsertPage, SelectPage, githubCalendar, InsertGithubCalendar, SelectGithubCalendar } from '@/db/schemas/page-schema';
import { db } from '@/db/drizzle';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getPageIdForUser(): Promise<number | null> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  try {
    const result = await db.select({ id: page.id })
      .from(page)
      .where(eq(page.userId, userId))
      .limit(1);
    
    return result.length > 0 ? result[0].id : null;
  } catch (error) {
    console.error('Error getting page ID for user:', error);
    throw error;
  }
}

export async function getPage(userId: string): Promise<SelectPage | null> {
  try {
    const result = await db
      .select()
      .from(page)
      .where(eq(page.userId, userId))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error getting page:', error);
    throw error;
  }
}

export async function createPage(pageData: Omit<InsertPage, 'id' | 'createdAt' | 'updatedAt'>): Promise<SelectPage> {
  try {
    const result = await db.insert(page).values(pageData).returning();
    revalidatePath('/dashboard');
    return result[0];
  } catch (error) {
    console.error('Error creating page:', error);
    throw error;
  }
}

export async function updatePage(
  pageId: number,
  pageData: Partial<Omit<InsertPage, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<SelectPage | null> {
  try {
    const result = await db
      .update(page)
      .set(pageData)
      .where(eq(page.id, pageId))
      .returning();
    
    // Revalidate both dashboard and the specific page
    revalidatePath('/dashboard');
    if (result[0]?.pageSlug) {
      revalidatePath(`/${result[0].pageSlug}`);
    }
    
    return result[0];
  } catch (error) {
    console.error('Error updating page:', error);
    throw error;
  }
}

export async function getPageById(id: number) {
  const result = await db.select().from(page).where(eq(page.id, id));
  return result[0];
}

export async function getPageBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(page)
      .where(eq(page.pageSlug, slug))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.error('Error getting page by slug:', error);
    throw error;
  }
}

export async function createPageAndRedirect(pageData: Omit<InsertPage, 'id' | 'createdAt' | 'updatedAt'>) {
  await createPage(pageData);
  redirect('/dashboard');
}

export async function getSlug() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const pageResult = await db.select().from(page).where(eq(page.userId, userId));
  return pageResult[0]?.pageSlug;
}

export async function getGithubCalendar(pageId: number): Promise<SelectGithubCalendar> {
  try {
    const result = await db
      .select()
      .from(githubCalendar)
      .where(eq(githubCalendar.pageId, pageId))
      .limit(1);

    return result[0];
  } catch (error) {
    console.error('Error getting github calendar:', error);
    throw error;
  }
}

export async function upsertGithubCalendar(
  pageId: number,
  data: { username: string; theme: string }
): Promise<SelectGithubCalendar> {
  try {
    const existing = await getGithubCalendar(pageId);
    
    if (existing) {
      const [updated] = await db
        .update(githubCalendar)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(githubCalendar.pageId, pageId))
        .returning();
      revalidatePath('/dashboard');
      return updated;
    }

    const [created] = await db
      .insert(githubCalendar)
      .values({ ...data, pageId })
      .returning();
    revalidatePath('/dashboard');
    return created;
  } catch (error) {
    console.error('Error upserting github calendar:', error);
    throw error;
  }
}

export async function deleteGithubCalendar(pageId: number): Promise<void> {
  try {
    await db
      .delete(githubCalendar)
      .where(eq(githubCalendar.pageId, pageId));
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error deleting github calendar:', error);
    throw error;
  }
}