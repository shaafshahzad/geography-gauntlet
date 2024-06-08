import { Gauntlet } from "./_components/main/gauntlet";
import { Quizzes } from "./_components/main/quizzes";
import { UserStats } from "./_components/main/user-stats";
import { Leaderboard } from "./_components/main/leaderboard";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "~/trpc/server";

export default async function Home() {
  let userStats = null;
  const { userId } = auth();

  if (userId) {
    const user = await currentUser();
    if (!user) {
      console.log("User not authenticated or not found");
    } else {
      const userExists = await api.user.getUser({ user_id: user.id });
      if (!userExists) {
        await api.user.createUser({
          user_id: user.id,
          fullname: user.firstName + " " + user.lastName,
        });
      }

      userStats = await api.user.getStats({ user_id: userId });
      if (!userStats) {
        console.log("User stats not found");
      }
    }
  }

  return (
    <div className="flex h-full flex-col justify-between gap-5 pt-8 md:h-[calc(100vh-136px)] md:pt-14">
      <div className="flex h-full w-full flex-col justify-between gap-5 md:flex-row">
        <UserStats userStats={userStats} />
        <Leaderboard />
      </div>
      <Gauntlet />
      <Quizzes />
    </div>
  );
}
