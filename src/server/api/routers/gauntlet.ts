import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gauntletRouter = createTRPCRouter({
  getAllCountries: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.countries.findMany();
  }),

  getCountry: publicProcedure
    .input(
      z.object({
        country_id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.countries.findMany({
        where: (countries, { eq }) =>
          eq(countries.country_id, input.country_id),
      });
    }),

  getQuestion: publicProcedure
    .input(
      z.object({
        question_id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.gauntlet_questions.findMany({
        where: (gauntlet_questions, { eq }) =>
          eq(gauntlet_questions.question_id, input.question_id),
      });
    }),

  getAnswer: publicProcedure
    .input(
      z.object({
        question_id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.gauntlet_answers.findMany({
        where: (gauntlet_answers, { eq }) =>
          eq(gauntlet_answers.question_id, input.question_id),
      });
    }),
});
