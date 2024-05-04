import { GameRooms } from "./_components/main/game-rooms";
import { Gauntlet } from "./_components/main/gauntlet";
import { Quizzes } from "./_components/main/quizzes";
import { UserStats } from "./_components/main/user-stats";
import { Leaderboard } from "./_components/main/leaderboard";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "~/trpc/server";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    console.log("No userId found");
    return null;
  }

  const user = await currentUser();
  if (!user) {
    console.log("User not authenticated or not found");
    return null;
  }

  const userExists = await api.user.getUser({ user_id: user.id });
  if (!userExists) {
    await api.user.createUser({
      user_id: user.id,
      fullname: user.firstName + " " + user.lastName,
    });
  }

  const userStats = await api.user.getStats({ user_id: userId });
  if (!userStats) {
    console.log("User stats not found");
    return null;
  }

  return (
    <div className="flex h-full flex-col justify-between gap-5 pt-20">
      <div className="flex w-full flex-row justify-between">
        <UserStats userStats={userStats} />
        <Leaderboard />
      </div>
      <GameRooms />
      <Gauntlet />
      <Quizzes />
    </div>
  );
}
