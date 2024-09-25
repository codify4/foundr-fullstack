ALTER TABLE "page" ALTER COLUMN "image" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "page" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "page" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "page" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "page" ALTER COLUMN "bio" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "page_slug" text NOT NULL;