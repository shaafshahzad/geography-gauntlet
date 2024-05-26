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
  flag_quiz_score: number;
  flag_quiz_time: number;
}

interface FlagQuizLeaderboardProps {
  leaderboard: LeaderboardItem[];
}

export function FlagQuizLeaderboard({ leaderboard }: FlagQuizLeaderboardProps) {
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
              {user.flag_quiz_score}/197 in {formatTime(user.flag_quiz_time)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
