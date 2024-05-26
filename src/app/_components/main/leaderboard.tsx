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

interface LeaderboardItem {
  fullname: string;
  gauntlet_score: number;
  flag_quiz_score: number;
  flag_quiz_time: number;
  country_quiz_score: number;
  country_quiz_time: number;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardItem[];
}

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

      const data: LeaderboardResponse = await response.json();
      setLeaderboard(data.leaderboard);
      setCategory(value);
    } catch (error) {
      console.error("Failed to retrieve leaderboard", error);
    }
  };

  useEffect(() => {
    void fetchLeaderboard(category);
  }, [category]);

  return (
    <Card className="flex w-full flex-col gap-4 p-5">
      <CardTitle className="flex justify-between align-top">
        Leaderboard
        <Select onValueChange={fetchLeaderboard} defaultValue="gauntlet">
          <SelectTrigger className="h-[30px] w-[180px]">
            <SelectValue placeholder="Gauntlet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gauntlet">Gauntlet</SelectItem>
            <SelectItem value="flag-quiz">Flag Quiz</SelectItem>
            <SelectItem value="country-quiz">Country Quiz</SelectItem>
          </SelectContent>
        </Select>
      </CardTitle>
      <CardContent className="pb-0">
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
