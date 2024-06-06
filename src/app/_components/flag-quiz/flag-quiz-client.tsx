"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchFlags } from "~/lib/utils/fetch-flags";
import { updateStats } from "~/lib/utils/update-stats";
import { FlagCarousel } from "./flag-carousel";
import { QuizControls } from "../quiz-controls";
import { type CarouselApi } from "~/components/ui/carousel";
import { QuizCountdown } from "../quiz-countdown";
import { RestartScreen } from "../restart-screen";
import { useToast } from "~/components/ui/use-toast";
import { Card, CardContent } from "~/components/ui/card";
import { FlagQuizStartScreen } from "./flag-quiz-start-screen";

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
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isStarted) {
      const startGame = async () => {
        try {
          const flags = await fetchFlags();
          if (flags) {
            setCountryFlags(flags);
          }
          setElapsedTime(0);
          setTimer(1080);

          intervalRef.current = setInterval(() => {
            setTimer((prev) => {
              if (prev <= 1) {
                clearInterval(intervalRef.current!);
                setElapsedTime(1080);
                setGameOver(true);
                updateStats(userId, "flag_quiz_time", 1080).catch(
                  console.error,
                );
                updateStats(userId, "flag_quiz_score", totalScore).catch(
                  console.error,
                );
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } catch (error) {
          console.error(error);
        }
      };

      startGame().catch(console.error);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStarted]);

  useEffect(() => {
    if (gameOver) {
      updateStats(userId, "flag_quiz_time", 1080).catch(console.error);
      updateStats(userId, "flag_quiz_score", totalScore).catch(console.error);
    }
  }, [gameOver, totalScore, userId]);

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
          clearInterval(intervalRef.current!);
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
      handleSubmit().catch(console.error);
    }
  };

  if (gameOver) {
    return (
      <RestartScreen
        totalScore={totalScore}
        questionNumber={0}
        elapsedTime={elapsedTime}
        restart={startQuiz}
        isGauntlet={false}
      />
    );
  }

  if (!isStarted) {
    return <FlagQuizStartScreen isStarted={isStarted} startGame={startQuiz} />;
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
