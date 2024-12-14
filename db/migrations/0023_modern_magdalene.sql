ALTER TABLE "feedback" RENAME COLUMN "page_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_page_id_page_id_fk";
--> statement-breakpoint
ALTER TABLE "feedback" ALTER COLUMN "user_id" SET DATA TYPE varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feedback" ADD CONSTRAINT "feedback_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
