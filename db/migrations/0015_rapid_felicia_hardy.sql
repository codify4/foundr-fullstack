ALTER TABLE "page" DROP CONSTRAINT "page_image_image_id_fk";
--> statement-breakpoint
ALTER TABLE "image" ADD COLUMN "page_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "image" ADD CONSTRAINT "image_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "page" DROP COLUMN IF EXISTS "image";