import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { countries } from "~/server/db/schema";

export const countryRouter = createTRPCRouter({
  addCountry: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        capital: z.string().min(1),
        population: z.string().min(1),
        flag_color: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(countries).values({
        name: input.name,
        capital: input.capital,
        population: input.population,
        flag_color: input.flag_color,
      });
    }),

  getCountries: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.countries.findMany();
  }),
});
