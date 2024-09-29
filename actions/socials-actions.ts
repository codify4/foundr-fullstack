'use server'

import { eq } from 'drizzle-orm';
import { socialLink, InsertSocial, SelectSocial } from '@/db/schemas/page-schema';
import { db } from '@/db/drizzle';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

async function getAuthenticatedUser() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Authentication required');
  }
  return session.user;
}

export async function createSocialLink(data: InsertSocial): Promise<SelectSocial> {
  await getAuthenticatedUser();
  try {
    const [newSocialLink] = await db.insert(socialLink).values(data).returning();
    revalidatePath('/dashboard');
    return newSocialLink;
  } catch (error) {
    console.error('Error creating social link:', error);
    throw new Error('Failed to create social link');
  }
}

export async function getSocialLinksByPageId(pageId: number): Promise<SelectSocial[]> {
  await getAuthenticatedUser();
  try {
    return db.select().from(socialLink)
      .where(eq(socialLink.pageId, pageId))
      .orderBy(socialLink.createdAt);
  } catch (error) {
    console.error('Error fetching social links:', error);
    throw new Error('Failed to fetch social links');
  }
}

export async function updateSocialLink(id: number, data: Partial<InsertSocial>): Promise<SelectSocial | undefined> {
  await getAuthenticatedUser();
  try {
    const [updatedSocialLink] = await db.update(socialLink)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(socialLink.id, id))
      .returning();
    if (updatedSocialLink) {
        revalidatePath('/dashboard');
    }
    return updatedSocialLink;
  } catch (error) {
    console.error('Error updating social link:', error);
    throw new Error('Failed to update social link');
  }
}

export async function deleteSocialLink(id: number): Promise<void> {
  try {
    const [deletedSocialLink] = await db.delete(socialLink)
      .where(eq(socialLink.id, id))
      .returning();
    if (deletedSocialLink) {
        revalidatePath('/dashboard');
    }
  } catch (error) {
    console.error('Error deleting social link:', error);
    throw new Error('Failed to delete social link');
  }
}