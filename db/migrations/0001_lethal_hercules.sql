DO $$ BEGIN
 CREATE TYPE "public"."socials" AS ENUM('twitter', 'instagram', 'facebook', 'linkedin', 'github', 'website');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "page" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"image" varchar,
	"name" varchar,
	"bio" text,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"name" varchar,
	"one_liner" varchar,
	"url" varchar,
	"mrr" varchar,
	"page_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social_link" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"type" "socials",
	"link" varchar,
	"page_id" integer NOT NULL
);
