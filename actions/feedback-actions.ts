'use server'

import { db } from "@/db/drizzle";
import { feedback, InsertFeedback, SelectFeedback } from "@/db/schemas/page-schema";
import { revalidatePath } from "next/cache";

export const createFeedback = async (formData: Omit<InsertFeedback, 'id' | 'createdAt' | 'updatedAt'>): Promise<SelectFeedback> => {
    try {
        const feedbackData = await db.insert(feedback).values(formData).returning();
        revalidatePath('/dashboard/feedback');
        return feedbackData[0];
    } catch (error) {
        console.error('Error creating feedback:', error);
        throw error;
    }
}