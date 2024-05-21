import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { formatTime } from "~/lib/utils/format-time";

interface UserStatsProps {
  userStats?: {
    user_id: string;
    user_stat_id: number;
    room_wins: string;
    gauntlet_score: string;
    country_quiz_time: string;
    flag_quiz_time: string;
    country_quiz_score: string;
    flag_quiz_score: string;
  } | null;
}

export function UserStats({ userStats }: UserStatsProps) {
  if (!userStats) {
    return (
      <Card>
        <CardTitle>User Stats</CardTitle>
        <CardContent>
          <p>Sign in to view your stats or sign up to track them</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardTitle>User Stats</CardTitle>
      <CardContent>
        <p>Here are your stats:</p>
        <p>Highest Gauntlet Score: {userStats.gauntlet_score}</p>
        <p>
          Country Quiz Performance: {userStats.country_quiz_score}/196 in{" "}
          {formatTime(userStats.country_quiz_time)}
        </p>
        <p>
          Flaq Quiz Performance: {userStats.flag_quiz_score}/196 in{" "}
          {formatTime(userStats.flag_quiz_time)}
        </p>
      </CardContent>
    </Card>
  );
}
