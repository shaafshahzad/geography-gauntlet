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

export function GauntletLeaderboard({ leaderboard }: GauntletLeaderboardProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70px]">Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{truncateName(user.fullname)}</TableCell>
            <TableCell className="text-right">{user.gauntlet_score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
