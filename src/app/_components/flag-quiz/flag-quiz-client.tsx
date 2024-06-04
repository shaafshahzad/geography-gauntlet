// TODO: refactor and simplify

"use client";

import React, { useState, useEffect } from "react";
import { fetchFlags } from "~/lib/utils/fetch-flags";
import { updateStats } from "~/lib/utils/update-stats";
import { FlagCarousel } from "./flag-carousel";
import { QuizControls } from "../quiz-controls";
import { type CarouselApi } from "~/components/ui/carousel";
import { QuizStart } from "../quiz-start";
import { QuizCountdown } from "../quiz-countdown";
import { QuizRestart } from "../quiz-restart";
import { useToast } from "~/components/ui/use-toast";
import { Card, CardContent } from "~/components/ui/card";

interface Flag {
  country_id: number;
  name: string;
  flag_url: string;
}

export function FlagQuizClient({ userId }: { userId?: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [countryFlags, setCountryFlags] = useState<Flag[]>([]);
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [timer, setTimer] = useState(1080);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  // IF ANY ISSUES WITH FLAG RENDER, FIX HERE
  useEffect(() => {
    if (isStarted) {
      const startGame = async () => {
        const flags = await fetchFlags();
        if (flags) {
          setCountryFlags(flags);
        }
        setStartTime(Date.now());
        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              const endTime = Date.now();
              setElapsedTime((endTime - startTime) / 1000);
              setGameOver(true);
              updateStats(
                userId,
                "flag_quiz_time",
                Math.floor(elapsedTime).toString(),
              );
              updateStats(userId, "flag_quiz_score", totalScore.toString());
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => {
          clearInterval(interval);
        };
      };

      startGame();
    }
  }, [isStarted, gameOver]);

  useEffect(() => {
    if (gameOver && elapsedTime > 0) {
      updateStats(userId, "flag_quiz_time", Math.floor(elapsedTime).toString());
      updateStats(userId, "flag_quiz_score", totalScore.toString());
    }
  }, [gameOver, elapsedTime]);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrentFlagIndex(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrentFlagIndex(api.selectedScrollSnap() + 1);
    });
  }, [api, isStarted]);

  const startQuiz = () => {
    setAnswer("");
    setTotalScore(0);
    setGameOver(false);
    setTimer(1080);
    setElapsedTime(0);
    setIsStarted(true);
    setStartTime(Date.now());
  };

  const handleSubmit = async () => {
    if (answer && countryFlags) {
      const currentFlag = countryFlags[currentFlagIndex - 1];
      if (
        currentFlag?.name.toLowerCase().replace(/[^a-zA-Z]/g, "") ===
        answer.toLowerCase().replace(/[^a-zA-Z]/g, "")
      ) {
        setTotalScore((prev) => prev + 1);
        const newFlags = [...countryFlags];
        newFlags.splice(currentFlagIndex - 1, 1);
        if (currentFlagIndex > newFlags.length) {
          setCurrentFlagIndex(newFlags.length);
        }
        setCountryFlags(newFlags);
        setAnswer("");
        toast({
          title: "Correct!",
          description: `${currentFlag.name} was the right answer!`,
        });

        if (newFlags.length === 0) {
          const endTime = Date.now();
          setElapsedTime((endTime - startTime) / 1000);
          setGameOver(true);
        }
      } else {
        setAnswer("");
        toast({
          variant: "destructive",
          title: "Incorrect",
          description: "Try again!",
        });
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  if (gameOver) {
    return QuizRestart({
      startQuiz,
      totalScore,
      elapsedTime: elapsedTime,
    });
  }

  if (!isStarted) {
    return QuizStart(startQuiz);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <Card className="h-full w-full items-center justify-center p-10">
        <CardContent className="space-y-10 pb-0">
          <QuizCountdown timer={timer} totalScore={totalScore} />
          <FlagCarousel
            countryFlags={countryFlags}
            setApi={setApi}
            api={api}
            setCurrentFlagIndex={setCurrentFlagIndex}
          />
          <QuizControls
            answer={answer}
            onAnswerChange={setAnswer}
            onKeyDown={handleKeyDown}
          />
        </CardContent>
      </Card>
    </div>
  );
}
