CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(50) NOT NULL,
	"company" varchar(255),
	"service" varchar(255) NOT NULL,
	"preferred_date" varchar(20) NOT NULL,
	"preferred_time" varchar(20) NOT NULL,
	"notes" text,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
