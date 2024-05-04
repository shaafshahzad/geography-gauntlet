import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";

interface UserStatsProps {
  userStats: {
    user_id: string;
    user_stat_id: number;
    room_wins: string;
    gauntlet_score: string;
    country_quiz_time: string;
    flag_quiz_time: string;
  };
}

export function UserStats({ userStats }: UserStatsProps) {
  return (
    <Card>
      <CardTitle>User Stats</CardTitle>
      <CardContent>
        <SignedOut>
          <p>Sign in to view your stats or sign up to track them</p>
        </SignedOut>
        <SignedIn>
          <p>Here are your stats:</p>
          <p>Room Wins: {userStats.room_wins}</p>
          <p>Highest Gauntlet Score: {userStats.gauntlet_score}</p>
          <p>Fastest Country Quiz Time: {userStats.country_quiz_time}</p>
          <p>Fastest Flag Quiz Time: {userStats.flag_quiz_time}</p>
        </SignedIn>
      </CardContent>
    </Card>
  );
}
