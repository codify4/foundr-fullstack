ALTER TABLE "project" DROP CONSTRAINT "project_page_id_page_id_fk";
--> statement-breakpoint
ALTER TABLE "social_link" DROP CONSTRAINT "social_link_page_id_page_id_fk";
--> statement-breakpoint
ALTER TABLE "page" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "social_link" ADD CONSTRAINT "social_link_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
