import { gauntletRouter } from "~/server/api/routers/gauntlet";
import { userRouter } from "~/server/api/routers/user";
import { flagQuizRouter } from "~/server/api/routers/flag-quiz";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  gauntlet: gauntletRouter,
  user: userRouter,
  flagQuiz: flagQuizRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
