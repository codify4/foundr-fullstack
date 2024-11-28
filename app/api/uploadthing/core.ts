import { getPageIdForUser } from "@/actions/page-actions";
import { db } from "@/db/drizzle";
import { images } from "@/db/schemas/page-schema";
import { getAuthenticatedUser } from "@/lib/get-session";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getAuthenticatedUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      try {
        const pageId = await getPageIdForUser();
        if (!pageId) {
          throw new Error('No page ID found for user');
        }

        // Check for existing image
        const existingImage = await db
          .select()
          .from(images)
          .where(eq(images.pageId, pageId));

        if (existingImage.length > 0) {
          // Update existing image
          await db
            .update(images)
            .set({
              url: file.url,
              name: file.name,
              updatedAt: new Date(),
            })
            .where(eq(images.id, existingImage[0].id));
        } else {
          // Insert new image
          await db.insert(images).values({
            name: file.name,
            url: file.url,
            pageId: pageId,
          });
        }

        // Revalidate the dashboard page to show updated image
        revalidatePath('/dashboard');
        
        console.log('Successfully updated image in database');
      } catch (error) {
        console.error('Error updating image in database:', error);
        throw error;
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
