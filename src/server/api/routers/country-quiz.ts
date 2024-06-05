import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const countryQuizRouter = createTRPCRouter({
  getCountries: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.countries.findMany();
  }),
});
