import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const flagQuizRouter = createTRPCRouter({
  getCountryFlags: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.countries.findMany();
  }),
});
