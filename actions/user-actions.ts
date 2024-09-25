'use server'

import { auth } from '@/auth';
import { db } from '@/db/drizzle';
import { page } from '@/db/schemas/page-schema';
import { eq } from 'drizzle-orm';

async function getPageId(slug: string) {
  const result = await db.select({ id: page.id })
  .from(page)
  .where(eq(page.pageSlug, slug))

  return result;
}

export async function updateSlug(slug: string) {
  const pageId = await getPageId(slug);
  if (pageId.length === 0) {
    return { message: 'Page not found' };
  }
  
  await db.update(page).set({ pageSlug: slug });
}