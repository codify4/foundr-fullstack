ALTER TABLE "github_calendar" ALTER COLUMN "theme" SET DEFAULT 'github';--> statement-breakpoint
ALTER TABLE "github_calendar" ADD COLUMN "show" boolean DEFAULT false NOT NULL;