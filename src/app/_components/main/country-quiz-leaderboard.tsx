import { truncateName } from "~/lib/utils/truncate-name";
import { formatTime } from "~/lib/utils/format-time";

interface LeaderboardItem {
  fullname: string;
  country_quiz_score?: string;
  country_quiz_time?: string;
}

interface CountryQuizLeaderboardProps {
  leaderboard: LeaderboardItem[];
}

const parseScore = (score: string | undefined) => {
  return score ? parseInt(score, 10) : 0;
};

export function CountryQuizLeaderboard({
  leaderboard,
}: CountryQuizLeaderboardProps) {
  return (
    <>
      {leaderboard
        .sort((a, b) => {
          const scoreDiff =
            parseScore(b.country_quiz_score) - parseScore(a.country_quiz_score);
          if (scoreDiff !== 0) return scoreDiff;
          return (
            new Date(a.country_quiz_time!).getTime() -
            new Date(b.country_quiz_time!).getTime()
          );
        })
        .map((user, index) => (
          <div key={index} className="flex justify-between">
            <p>{index + 1}</p>
            <p>{truncateName(user.fullname)}</p>
            <p>
              {user.country_quiz_score}/196 in{" "}
              {formatTime(user.country_quiz_time)}
            </p>
          </div>
        ))}
    </>
  );
}
