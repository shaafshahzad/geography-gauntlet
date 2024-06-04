import { z } from "zod";
import { eq, and, desc, asc } from "drizzle-orm";
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

      let shouldUpdate = false;

      if (target.includes("time")) {
        if (newValue > 0 && (currentValue === 0 || newValue < currentValue)) {
          shouldUpdate = true;
        }
      } else {
        if (newValue > currentValue) {
          shouldUpdate = true;
        }
      }

      if (shouldUpdate) {
        await ctx.db
          .update(users_stats)
          .set({
            [target]: value,
          })
          .where(eq(users_stats.user_id, user_id));
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
          .from(users_stats)
          .orderBy(desc(users_stats.gauntlet_score))
          .limit(5);
      } else if (input.value === "flag-quiz") {
        return await ctx.db
          .select()
          .from(users_stats)
          .orderBy(
            desc(users_stats.flag_quiz_score),
            asc(users_stats.flag_quiz_time),
          )
          .limit(5);
      } else if (input.value === "country-quiz") {
        return await ctx.db
          .select()
          .from(users_stats)
          .orderBy(
            desc(users_stats.country_quiz_score),
            asc(users_stats.country_quiz_time),
          )
          .limit(5);
      }
    }),
});
