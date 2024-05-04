// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `country-games_${name}`);

export const users = createTable(
  "user",
  {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", { length: 256 }).notNull(),
    fullname: varchar("fullname", { length: 256 }).notNull(),
    created_at: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
  },
  (example) => ({
    fullname: index("fullname_idx").on(example.fullname),
  }),
);

export const users_stats = createTable(
  "user_stat",
  {
    user_stat_id: serial("id").primaryKey(),
    user_id: varchar("user_id", { length: 256 }).notNull(),
    room_wins: varchar("room_wins", { length: 256 }).notNull(),
    gauntlet_score: varchar("gauntlet_score", { length: 256 }).notNull(),
    country_quiz_time: varchar("country_quiz_time", { length: 256 }).notNull(),
    flag_quiz_time: varchar("flag_quiz_time", { length: 256 }).notNull(),
  },
  (example) => ({
    user_id: index("user_id_idx").on(example.user_id),
  }),
);

export const countries = createTable(
  "country",
  {
    country_id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    capital: varchar("capital", { length: 256 }).notNull(),
    population: varchar("population", { length: 256 }).notNull(),
    flag_color: varchar("flag_color", { length: 256 }).notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const gauntlet_questions = createTable("gauntlet_question", {
  question_id: serial("id").primaryKey(),
  template: varchar("template", { length: 256 }).notNull(),
  difficulty: varchar("difficulty", { length: 256 }).notNull(),
});

export const gauntlet_answers = createTable("gauntlet_answer", {
  answer_id: serial("id").primaryKey(),
  question_id: serial("question_id"),
  answer: varchar("answer", { length: 256 }),
});
