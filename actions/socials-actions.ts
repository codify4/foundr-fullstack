'use server'

import { eq } from 'drizzle-orm';
import { socialLink, InsertSocial, SelectSocial } from '@/db/schemas/page-schema';
import { db } from '@/db/drizzle';


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