import { GameRooms } from "./_components/main/game-rooms";
import { Gauntlet } from "./_components/main/gauntlet";
import { Quizzes } from "./_components/main/quizzes";
import { UserStats } from "./_components/main/user-stats";

export default async function Home() {
  return (
    <div className="flex h-full flex-col justify-between gap-5 pt-20">
      <UserStats />
      <GameRooms />
      <Gauntlet />
      <Quizzes />
    </div>
  );
}
