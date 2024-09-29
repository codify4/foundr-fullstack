ALTER TABLE "project" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "one_liner" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "mrr" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "social_link" ALTER COLUMN "type" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "social_link" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "social_link" ALTER COLUMN "link" SET NOT NULL;