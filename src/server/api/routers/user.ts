import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users, users_stats } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.user_id, input.user_id),
      });
    }),

  createUser: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        fullname: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (db) => {
        await ctx.db.insert(users).values({
          user_id: input.user_id,
          fullname: input.fullname,
        });
        await ctx.db.insert(users_stats).values({
          user_id: input.user_id,
          room_wins: "0",
          gauntlet_score: "0",
          country_quiz_time: "0",
          flag_quiz_time: "0",
        });
      });
    }),

  getStats: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.users_stats.findFirst({
        where: (users_stats, { eq }) => eq(users_stats.user_id, input.user_id),
      });
    }),

  updateStats: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        target: z.string(),
        value: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { user_id, target, value } = input;
      const newValue = parseInt(value);

      const currentStats = await ctx.db.query.users_stats.findFirst({
        where: (users_stats, { eq }) => eq(users_stats.user_id, user_id),
      });

      if (!currentStats) {
        throw new Error("User stats not found");
      }

      const currentValue = parseInt(
        currentStats[target as keyof typeof currentStats].toString(),
      );

      if (newValue > currentValue) {
        await ctx.db
          .update(users_stats)
          .set({
            [target]: value,
          })
          .where(eq(users_stats.user_id, user_id));
      }
    }),
});
