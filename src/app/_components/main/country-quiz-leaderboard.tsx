import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import { truncateName } from "~/lib/utils/truncate-name";
import { formatTime } from "~/lib/utils/format-time";

interface LeaderboardItem {
  fullname: string;
  country_quiz_score: number;
  country_quiz_time: number;
}

interface CountryQuizLeaderboardProps {
  leaderboard: LeaderboardItem[];
}

export function CountryQuizLeaderboard({
  leaderboard,
}: CountryQuizLeaderboardProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{truncateName(user.fullname)}</TableCell>
            <TableCell className="text-right">
              {user.country_quiz_score}/197 in{" "}
              {formatTime(user.country_quiz_time)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
