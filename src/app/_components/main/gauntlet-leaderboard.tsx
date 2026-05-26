import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import { truncateName } from "~/lib/utils/truncate-name";

interface LeaderboardItem {
  fullname: string;
  gauntlet_score: number;
}

interface GauntletLeaderboardProps {
  leaderboard: LeaderboardItem[];
}

const medals = ["🥇", "🥈", "🥉"];
const medalColors = [
  "text-amber-500 font-bold",
  "text-slate-400 font-semibold",
  "text-amber-700 font-semibold",
];

export function GauntletLeaderboard({ leaderboard }: GauntletLeaderboardProps) {
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
              {user.gauntlet_score}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
