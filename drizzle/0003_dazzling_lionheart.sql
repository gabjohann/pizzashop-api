CREATE TABLE IF NOT EXISTS "auth_links" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "auth_links_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_manager_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_links" ADD CONSTRAINT "auth_links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_manager_id_users_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
