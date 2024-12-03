CREATE TABLE IF NOT EXISTS "github_calendar" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"username" varchar NOT NULL,
	"theme" varchar DEFAULT 'light' NOT NULL,
	"page_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "github_calendar" ADD CONSTRAINT "github_calendar_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
