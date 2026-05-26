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
    gauntlet_score: number;
    country_quiz_time: number;
    flag_quiz_time: number;
    country_quiz_score: number;
    flag_quiz_score: number;
  } | null;
}

const statRows = [
  {
    label: "Gauntlet High Score",
    key: "gauntlet_score" as const,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    format: (v: number) => v.toString(),
  },
  {
    label: "Country Quiz Score",
    key: "country_quiz_score" as const,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    format: (v: number) => `${v}/197`,
  },
  {
    label: "Country Quiz Best Time",
    key: "country_quiz_time" as const,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    format: (v: number) => formatTime(v.toString()),
  },
  {
    label: "Flag Quiz Score",
    key: "flag_quiz_score" as const,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-foreground dark:text-accent">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" x2="4" y1="22" y2="15" />
      </svg>
    ),
    format: (v: number) => `${v}/197`,
  },
  {
    label: "Flag Quiz Best Time",
    key: "flag_quiz_time" as const,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    format: (v: number) => formatTime(v.toString()),
  },
];

export function UserStats({ userStats }: UserStatsProps) {
  return (
    <Card className="flex w-full flex-col gap-4 p-5">
      <CardTitle className="font-heading flex h-[30px] items-center gap-2 text-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Your Stats
      </CardTitle>
      <CardContent className="h-full px-1 pb-0 sm:px-6">
        {!userStats ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <p className="text-sm">Sign in to track your scores</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statistic</TableHead>
                <TableHead className="text-right">Best</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statRows.map((row) => (
                <TableRow key={row.key}>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      {row.icon}
                      {row.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {row.format(userStats[row.key])}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
