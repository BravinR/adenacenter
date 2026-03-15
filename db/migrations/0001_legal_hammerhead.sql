CREATE TABLE "funnel_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(36) NOT NULL,
	"step" smallint NOT NULL,
	"event" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
