// TODO: refactor and simplify

"use client";

import React, { useState, useEffect } from "react";
import { fetchFlags } from "~/lib/utils/fetch-flags";
import { updateStats } from "~/lib/utils/update-stats";
import { FlagCarousel } from "./flag-carousel";
import { QuizControls } from "./flag-quiz-controls";
import { type CarouselApi } from "~/components/ui/carousel";
import { FlagQuizStart } from "./flag-quiz-start";
import { QuizCountdown } from "./flag-quiz-countdown";
import { FlagQuizRestart } from "./flag-quiz-restart";

interface Flag {
  country_id: string;
  name: string;
  flag_url: string;
}

interface FlagQuizClientProps {
  userId?: string;
}

export function FlagQuizClient({ userId }: FlagQuizClientProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [countryFlags, setCountryFlags] = useState<Flag[]>([]);
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [timer, setTimer] = useState(1080);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (isStarted) {
      fetchFlags(setCountryFlags);
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
    setIsCorrect(null);
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
        setIsCorrect(true);
        setTotalScore((prev) => prev + 1);
        const newFlags = [...countryFlags];
        newFlags.splice(currentFlagIndex - 1, 1);
        if (currentFlagIndex > newFlags.length) {
          setCurrentFlagIndex(newFlags.length);
        }
        setCountryFlags(newFlags);
        setAnswer("");

        if (newFlags.length === 0) {
          const endTime = Date.now();
          setElapsedTime((endTime - startTime) / 1000);
          setGameOver(true);
        }
      } else {
        setIsCorrect(false);
        setAnswer("");
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  if (gameOver) {
    return FlagQuizRestart({
      startQuiz,
      totalScore,
      elapsedTime: elapsedTime,
    });
  }

  if (!isStarted) {
    return FlagQuizStart(startQuiz);
  }

  return (
    <div className="flex max-w-6xl flex-col items-center justify-center gap-10">
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
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        isCorrect={isCorrect}
      />
    </div>
  );
}
