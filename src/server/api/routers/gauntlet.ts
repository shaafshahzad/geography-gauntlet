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

  getCountriesByLength: publicProcedure
    .input(
      z.object({
        length: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const countries = await ctx.db.query.countries.findMany();
      return countries.filter(
        (country) => country.name.length === input.length,
      );
    }),

  getCountriesByStartLetter: publicProcedure
    .input(
      z.object({
        letter: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const allCountries = await ctx.db.query.countries.findMany();
      return allCountries.filter((country) =>
        country.name.startsWith(input.letter),
      );
    }),

  getCountriesByEndLetter: publicProcedure
    .input(
      z.object({
        letter: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const allCountries = await ctx.db.query.countries.findMany();
      return allCountries.filter((country) =>
        country.name.endsWith(input.letter),
      );
    }),

  getCountriesByColor: publicProcedure
    .input(
      z.object({
        color: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      const colorPattern = `%${input.color}%`;
      return ctx.db.query.countries.findMany({
        where: (countries, { or, like }) =>
          or(
            like(countries.flag_color, `${input.color}, %`), // Color at the beginning, followed by comma
            like(countries.flag_color, `%, ${input.color}, %`), // Color in the middle, enclosed by commas
            like(countries.flag_color, `%, ${input.color}`), // Color at the end, preceded by a comma
            like(countries.flag_color, input.color), // Exactly matching the whole field if only one color
          ),
      });
    }),

  checkPopulation: publicProcedure
    .input(
      z.object({
        country: z.string(),
        population: z.number(),
        condition: z.enum(["less", "greater"]), // "less" for less than, "greater" for greater than
      }),
    )
    .query(async ({ ctx, input }) => {
      const countryData = await ctx.db.query.countries.findFirst({
        where: (countries, { ilike }) => ilike(countries.name, input.country),
      });

      if (!countryData) {
        return false; // Country not found or other error
      }

      if (input.condition === "less") {
        return parseInt(countryData.population) < input.population;
      } else if (input.condition === "greater") {
        return parseInt(countryData.population) > input.population;
      }

      return false; // In case the condition is not met or invalid
    }),
});
