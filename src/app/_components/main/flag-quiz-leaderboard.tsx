import { truncateName } from "~/lib/utils/truncate-name";
import { formatTime } from "~/lib/utils/format-time";

interface LeaderboardItem {
  fullname: string;
  flag_quiz_score?: string;
  flag_quiz_time?: string;
}

interface FlagQuizLeaderboardProps {
  leaderboard: LeaderboardItem[];
}

const parseScore = (score: string | undefined) => {
  return score ? parseInt(score, 10) : 0;
};

export function FlagQuizLeaderboard({ leaderboard }: FlagQuizLeaderboardProps) {
  return (
    <>
      {leaderboard
        .sort((a, b) => {
          const scoreDiff =
            parseScore(b.flag_quiz_score) - parseScore(a.flag_quiz_score);
          if (scoreDiff !== 0) return scoreDiff;
          return (
            new Date(a.flag_quiz_time!).getTime() -
            new Date(b.flag_quiz_time!).getTime()
          );
        })
        .map((user, index) => (
          <div key={index} className="flex justify-between">
            <p>{index + 1}</p>
            <p>{truncateName(user.fullname)}</p>
            <p>
              {user.flag_quiz_score}/196 in {formatTime(user.flag_quiz_time)}
            </p>
          </div>
        ))}
    </>
  );
}
