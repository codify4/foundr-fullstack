'use server'

import { db } from '@/db/drizzle';
import { page } from '@/db/schemas/page-schema';
import { eq } from 'drizzle-orm';

export async function addPageSlug(formData: FormData) {
  const pageId = formData.get('pageId') as string;
  const slug = formData.get('slug') as string;

  if (!pageId || !slug) {
    return { message: 'Page ID and slug are required.' };
  }

  try {
    const validSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const existingPage = await db.select().from(page).where(eq(page.pageSlug, validSlug));
    if (existingPage) {
      return { message: 'This slug is already in use. Please choose another.' };
    }

    await db.update(page).set({ pageSlug: validSlug, updatedAt: new Date() }).where(eq(page.id, parseInt(pageId)));

  } catch (error) {
    console.error('Error updating page slug:', error);
    return { message: 'An error occurred while updating the page slug.' };
  }
}