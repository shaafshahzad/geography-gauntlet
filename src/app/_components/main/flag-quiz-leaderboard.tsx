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

const medals = ["🥇", "🥈", "🥉"];
const medalColors = [
  "text-amber-500 font-bold",
  "text-slate-400 font-semibold",
  "text-amber-700 font-semibold",
];

export function FlagQuizLeaderboard({ leaderboard }: FlagQuizLeaderboardProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard.map((user, index) => (
          <TableRow key={index} className={index < 3 ? "bg-muted/30" : ""}>
            <TableCell className={`font-medium ${index < 3 ? medalColors[index] : ""}`}>
              {index < 3 ? medals[index] : index + 1}
            </TableCell>
            <TableCell className={index < 3 ? "font-medium" : ""}>
              {truncateName(user.fullname)}
            </TableCell>
            <TableCell className="text-right font-mono text-sm">
              {user.flag_quiz_score}/197 · {formatTime(user.flag_quiz_time)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
