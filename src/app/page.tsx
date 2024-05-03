import { GameRooms } from "./_components/game-rooms";
import { Gauntlet } from "./_components/gauntlet";
import { Quizzes } from "./_components/quizzes";
import { UserStats } from "./_components/user-stats";

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
