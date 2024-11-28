'use server'

import { eq } from 'drizzle-orm';
import { page, InsertPage, SelectPage, images, SelectImage } from '@/db/schemas/page-schema';
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

export type PageWithImage = SelectPage & {
  image: SelectImage
}

export async function getPageWithImage(userId: string): Promise<PageWithImage | null> {
  try {
    const result = await db
      .select({
        page: page,
        image: images
      })
      .from(page)
      .leftJoin(images, eq(images.pageId, page.id))
      .where(eq(page.userId, userId))
      .limit(1);

    if (result.length === 0) return null;

    const pageData = result[0].page;
    const imageData = result[0].image || {
      id: 0,
      name: 'default',
      url: '/foundr.png',
      pageId: pageData.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {
      ...pageData,
      image: imageData
    };
  } catch (error) {
    console.error('Error getting page with image:', error);
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
  if (!pageId || !pageData) {
    throw new Error('Missing required fields');
  }

  try {
    const [updatedPage] = await db
      .update(page)
      .set({
        ...pageData,
        updatedAt: new Date(),
      })
      .where(eq(page.id, pageId))
      .returning();
    
    revalidatePath('/dashboard');
    return updatedPage;
  } catch (error) {
    console.error('Error updating page:', error);
    return null;
  }
}

export async function getPageById(id: number) {
  const [foundPage] = await db.select().from(page).where(eq(page.id, id));
  return foundPage;
}

export async function getPageBySlug(slug: string) {
  try {
    const result = await db
      .select({
        page: page,
        image: images
      })
      .from(page)
      .leftJoin(images, eq(page.id, images.pageId))
      .where(eq(page.pageSlug, slug))
      .limit(1);

    if (result.length === 0) return null;

    return {
      ...result[0].page,
      image: result[0].image
    };
  } catch (error) {
    console.error('Error getting page by slug:', error);
    return null;
  }
}

export async function createPageAndRedirect(pageData: Omit<InsertPage, 'id' | 'createdAt' | 'updatedAt'>) {
  await createPage(pageData)
  redirect('/dashboard') // This will work because it's a server action
}

export async function getSlug() {
  const pageId = await getPageIdForUser();
  if (!pageId) {
    throw new Error('No page ID found');
  }

  const [foundPage] = await db.select().from(page).where(eq(page.id, pageId));
  
  return foundPage.pageSlug;
}

export async function updatePageImage(pageId: number, imageUrl: string, imageName: string) {
  try {
    // First, try to find an existing image for this page
    const existingImage = await db
      .select()
      .from(images)
      .where(eq(images.pageId, pageId))
      .limit(1);

    if (existingImage.length > 0) {
      // Update existing image
      await db
        .update(images)
        .set({
          url: imageUrl,
          name: imageName,
          updatedAt: new Date(),
        })
        .where(eq(images.id, existingImage[0].id));
    } else {
      // Create new image
      await db.insert(images).values({
        url: imageUrl,
        name: imageName,
        pageId: pageId,
      });
    }

    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error updating page image:', error);
    throw error;
  }
}