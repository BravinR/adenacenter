import { pgTable, serial, smallint, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }).notNull(),
  company: varchar("company", { length: 255 }),
  service: varchar("service", { length: 255 }).notNull(),
  preferredDate: varchar("preferred_date", { length: 20 }).notNull(),
  preferredTime: varchar("preferred_time", { length: 20 }).notNull(),
  notes: text("notes"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;

// Tracks per-session funnel events for drop-off analysis
export const funnelEvents = pgTable("funnel_events", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 36 }).notNull(),
  step: smallint("step").notNull(),            // 1 or 2
  event: varchar("event", { length: 20 }).notNull(), // "viewed" | "completed"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
