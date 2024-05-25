import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { formatTime } from "~/lib/utils/format-time";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface UserStatsProps {
  userStats?: {
    user_id: string;
    user_stat_id: number;
    gauntlet_score: string;
    country_quiz_time: string;
    flag_quiz_time: string;
    country_quiz_score: string;
    flag_quiz_score: string;
  } | null;
}

export function UserStats({ userStats }: UserStatsProps) {
  return (
    <Card className="flex w-full flex-col gap-4 p-5">
      <CardTitle className="h-[30px]">User Stats</CardTitle>
      <CardContent className="h-full">
        {!userStats ? (
          <div className="flex h-full w-full items-center justify-center">
            Sign in to view your stats or sign up to track them
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statistic</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Highest Gauntlet Score</TableCell>
                <TableCell className="text-right">
                  {userStats.gauntlet_score}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Country Quiz Score</TableCell>
                <TableCell className="text-right">
                  {userStats.country_quiz_score}/196
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Country Quiz Time</TableCell>
                <TableCell className="text-right">
                  {formatTime(userStats.country_quiz_time)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Flag Quiz Score</TableCell>
                <TableCell className="text-right">
                  {userStats.flag_quiz_score}/196
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Flag Quiz Time</TableCell>
                <TableCell className="text-right">
                  {formatTime(userStats.flag_quiz_time)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
