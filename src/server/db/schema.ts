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

export const countries = createTable(
  "country",
  {
    country_id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    capital: varchar("capital", { length: 256 }),
    population: varchar("population", { length: 256 }),
    flag_color: varchar("flag_color", { length: 256 }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const gauntlet_questions = createTable("gauntlet_question", {
  question_id: serial("id").primaryKey(),
  template: varchar("template", { length: 256 }),
  difficulty: varchar("difficulty", { length: 256 }),
});

export const gauntlet_answers = createTable("gauntlet_answer", {
  answer_id: serial("id").primaryKey(),
  question_id: serial("question_id"),
  answer: varchar("answer", { length: 256 }),
});
