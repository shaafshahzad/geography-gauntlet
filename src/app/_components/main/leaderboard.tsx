"use client";

import { Card, CardTitle, CardContent } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useEffect, useState } from "react";
import { GauntletLeaderboard } from "./gauntlet-leaderboard";
import { FlagQuizLeaderboard } from "./flag-quiz-leaderboard";
import { CountryQuizLeaderboard } from "./country-quiz-leaderboard";
import { fetchLeaderboard } from "~/lib/utils/fetch-leaderboard";

interface LeaderboardItem {
  fullname: string;
  gauntlet_score: number;
  flag_quiz_score: number;
  flag_quiz_time: number;
  country_quiz_score: number;
  country_quiz_time: number;
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[] | null>(
    null,
  );
  const [category, setCategory] = useState<string>("gauntlet");

  const getLeaderboard = async (value: string) => {
    try {
      const leaderboardData = await fetchLeaderboard(value);
      if (leaderboardData !== undefined) {
        setLeaderboard(leaderboardData);
      } else {
        setLeaderboard(null);
      }
      setCategory(value);
    } catch (error) {
      console.error("Failed to retrieve leaderboard", error);
      setLeaderboard(null);
    }
  };

  useEffect(() => {
    void getLeaderboard(category);
  }, [category]);

  return (
    <Card className="flex h-full w-full flex-col gap-4 p-5">
      <CardTitle className="flex justify-between align-top">
        Leaderboard
        <Select onValueChange={getLeaderboard} defaultValue="gauntlet">
          <SelectTrigger className="h-[29px] w-[140px] md:w-[100px] lg:w-[180px]">
            <SelectValue placeholder="Gauntlet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gauntlet">Gauntlet</SelectItem>
            <SelectItem value="flag-quiz">Flag Quiz</SelectItem>
            <SelectItem value="country-quiz">Country Quiz</SelectItem>
          </SelectContent>
        </Select>
      </CardTitle>
      <CardContent className="px-1 pb-0 sm:px-6">
        {leaderboard && category === "gauntlet" && (
          <GauntletLeaderboard leaderboard={leaderboard} />
        )}
        {leaderboard && category === "flag-quiz" && (
          <FlagQuizLeaderboard leaderboard={leaderboard} />
        )}
        {leaderboard && category === "country-quiz" && (
          <CountryQuizLeaderboard leaderboard={leaderboard} />
        )}
      </CardContent>
    </Card>
  );
}
