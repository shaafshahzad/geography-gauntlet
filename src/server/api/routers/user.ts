import { z } from "zod";
import { eq, desc, asc } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users_statistics } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        fullname: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async () => {
        await ctx.db.insert(users_statistics).values({
          user_id: input.user_id,
          fullname: input.fullname,
          gauntlet_score: 0,
          country_quiz_time: 0,
          country_quiz_score: 0,
          flag_quiz_time: 0,
          flag_quiz_score: 0,
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
      return await ctx.db.query.users_statistics.findFirst({
        where: (users_statistics, { eq }) =>
          eq(users_statistics.user_id, input.user_id),
      });
    }),

  updateStats: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        target: z.string(),
        value: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { user_id, target, value } = input;
      const newValue = value;

      try {
        await ctx.db.transaction(async (trx) => {
          const currentStats = await trx.query.users_statistics.findFirst({
            where: (users_statistics, { eq }) =>
              eq(users_statistics.user_id, user_id),
          });

          if (!currentStats) {
            throw new Error("User stats not found");
          }

          const currentValue = currentStats[
            target as keyof typeof currentStats
          ] as number;

          let shouldUpdate = false;

          if (target.includes("time")) {
            if (
              newValue > 0 &&
              (currentValue === 0 || newValue < currentValue)
            ) {
              shouldUpdate = true;
            }
          } else {
            if (newValue > currentValue) {
              shouldUpdate = true;
            }
          }

          if (shouldUpdate) {
            await trx
              .update(users_statistics)
              .set({
                [target]: value,
              })
              .where(eq(users_statistics.user_id, user_id));
          }
        });
      } catch (error) {
        console.error("Failed to update user stats:", error);
        throw new Error("Failed to update user stats");
      }
    }),

  getLeaderboard: publicProcedure
    .input(
      z.object({
        value: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.value === "gauntlet") {
        return await ctx.db
          .select()
          .from(users_statistics)
          .orderBy(desc(users_statistics.gauntlet_score))
          .limit(5);
      } else if (input.value === "flag-quiz") {
        return await ctx.db
          .select()
          .from(users_statistics)
          .orderBy(
            desc(users_statistics.flag_quiz_score),
            asc(users_statistics.flag_quiz_time),
          )
          .limit(5);
      } else if (input.value === "country-quiz") {
        return await ctx.db
          .select()
          .from(users_statistics)
          .orderBy(
            desc(users_statistics.country_quiz_score),
            asc(users_statistics.country_quiz_time),
          )
          .limit(5);
      }
    }),
});
