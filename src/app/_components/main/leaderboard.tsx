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

type LeaderboardCategory = "gauntlet" | "flag-quiz" | "country-quiz";

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[] | null>(
    null,
  );
  const [category, setCategory] = useState<LeaderboardCategory>("gauntlet");

  const handleCategoryChange = (value: string) => {
    setCategory(value as LeaderboardCategory);
  };

  useEffect(() => {
    let ignoreRequest = false;

    const getLeaderboard = async () => {
      try {
        const leaderboardData = await fetchLeaderboard(category);

        if (!ignoreRequest) {
          setLeaderboard(leaderboardData ?? null);
        }
      } catch (error) {
        console.error("Failed to retrieve leaderboard", error);

        if (!ignoreRequest) {
          setLeaderboard(null);
        }
      }
    };

    void getLeaderboard();

    return () => {
      ignoreRequest = true;
    };
  }, [category]);

  return (
    <Card className="flex h-full w-full flex-col gap-4 p-5">
      <CardTitle className="font-heading flex items-center justify-between gap-2 text-2xl align-top">
        <span className="flex items-center gap-2">
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
            className="text-accent-foreground dark:text-accent"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          Leaderboard
        </span>
        <Select value={category} onValueChange={handleCategoryChange}>
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
