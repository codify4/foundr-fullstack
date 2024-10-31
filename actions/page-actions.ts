'use server'

import { eq } from 'drizzle-orm';
import { page, InsertPage, SelectPage, images } from '@/db/schemas/page-schema';
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

export async function getAvatar() {
  const image = await db.select().from(images).limit(1);
  return image[0];
}

export async function createPage(pageData: Omit<InsertPage, 'id' | 'createdAt' | 'updatedAt'>): Promise<SelectPage> {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error('You must be logged in to add a habit');
  }

  const userId = session.user.id;

  if (!userId || !pageData) {
    throw new Error('Missing required fields');
  }
  
  try {
    const [newPage] = await db.insert(page).values({...pageData, userId}).returning();
    return newPage;
  } catch (error) {
    console.error('Error creating page:', error);
    throw error;
  }
}

export async function updatePage(pageId: number, pageData: Partial<Omit<InsertPage, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SelectPage | null> {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error('You must be logged in to update a page');
  }

  const userId = session.user.id;

  if (!userId || !pageData) {
    throw new Error('Missing required fields');
  }

  try {
    const [updatedPage] = await db.update(page)
      .set({ ...pageData, updatedAt: new Date() })
      .where(eq(page.id, pageId))
      .returning();
    
    if (updatedPage) {
      revalidatePath(`/${updatedPage.pageSlug}`);
    }

    return updatedPage || null;
  } catch (error) {
    console.error('Error updating page:', error);
    throw error;
  }
}

export async function getPageById(id: number) {
  const [foundPage] = await db.select().from(page).where(eq(page.id, id));
  return foundPage;
}

export async function getPageBySlug(slug: string) {
  const [foundPage] = await db
  .select()
  .from(page)
  .where(eq(page.pageSlug, slug));
  return foundPage;
}

export async function createPageAndRedirect(pageData: Omit<InsertPage, 'id' | 'createdAt' | 'updatedAt'>) {
  await createPage(pageData)
  redirect('/dashboard') // This will work because it's a server action
}