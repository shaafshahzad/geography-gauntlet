"use client";

import { Card, CardContent, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useEffect, useState } from "react";
import { formatTime } from "~/lib/utils/format-time";

interface LeaderboardItem {
  fullname: string;
  gauntlet_score?: string;
  flag_quiz_score?: string;
  flag_quiz_time?: string;
  country_quiz_score?: string;
  country_quiz_time?: string;
}

const truncateName = (fullname: string) => {
  const nameParts = fullname.split(" ");
  if (nameParts.length === 1) {
    return fullname;
  }
  return `${nameParts[0]} ${nameParts[1]?.charAt(0)}.`;
};

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[] | null>(
    null,
  );
  const [category, setCategory] = useState<string>("gauntlet");

  const fetchLeaderboard = async (value: string) => {
    try {
      const response = await fetch("/api/getLeaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setLeaderboard(data.leaderboard);
      setCategory(value);
    } catch (error) {
      console.error("Failed to retrieve leaderboard", error);
    }
  };

  const parseScore = (score: string | undefined) => {
    return score ? parseInt(score, 10) : 0;
  };

  useEffect(() => {
    fetchLeaderboard(category);
  }, []);

  return (
    <Card className="w-full">
      <CardTitle>Leaderboard</CardTitle>
      <CardContent>
        <Select onValueChange={fetchLeaderboard} defaultValue="gauntlet">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gauntlet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gauntlet">Gauntlet</SelectItem>
            <SelectItem value="flag-quiz">Flag Quiz</SelectItem>
            <SelectItem value="country-quiz">Country Quiz</SelectItem>
          </SelectContent>
        </Select>

        <div>
          {leaderboard &&
            category === "gauntlet" &&
            leaderboard
              .sort(
                (a, b) =>
                  parseScore(b.gauntlet_score) - parseScore(a.gauntlet_score),
              )
              .map((user, index) => (
                <div key={index} className="flex justify-between">
                  <p>{index + 1}</p>
                  <p>{truncateName(user.fullname)}</p>
                  <p>{user.gauntlet_score}</p>
                </div>
              ))}

          {leaderboard &&
            category === "flag-quiz" &&
            leaderboard
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
                    {user.flag_quiz_score}/196 in{" "}
                    {formatTime(user.flag_quiz_time)}
                  </p>
                </div>
              ))}

          {leaderboard &&
            category === "country-quiz" &&
            leaderboard
              .sort((a, b) => {
                const scoreDiff =
                  parseScore(b.country_quiz_score) -
                  parseScore(a.country_quiz_score);
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
        </div>
      </CardContent>
    </Card>
  );
}
