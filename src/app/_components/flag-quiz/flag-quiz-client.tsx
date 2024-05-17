// TODO: refactor and simplify

"use client";

import React, { useState, useEffect } from "react";
import { fetchFlags } from "~/lib/utils/fetch-flags";
import { formatTime } from "~/lib/utils/format-time";
import { updateStats } from "~/lib/utils/update-stats";
import { FlagCarousel } from "./flag-carousel";
import { QuizControls } from "./flag-quiz-controls";
import { type CarouselApi } from "~/components/ui/carousel";

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
      console.log(currentFlag);
      if (
        currentFlag?.name.toLowerCase().replace(/[^a-zA-Z]/g, "") ===
        answer.toLowerCase().replace(/[^a-zA-Z]/g, "")
      ) {
        setIsCorrect(true);
        setTotalScore((prev) => prev + 1);
        const newFlags = [...countryFlags];
        newFlags.splice(currentFlagIndex - 1, 1);
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
    return (
      <div>
        <h1>Game Over</h1>
        <p>
          You guessed {totalScore}/196 countries in{" "}
          {formatTime(Math.floor(elapsedTime).toString())} seconds
        </p>
        <button onClick={startQuiz}>Restart Game</button>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div>
        <button onClick={startQuiz}>Click to Start</button>
      </div>
    );
  }

  return (
    <>
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
        timer={timer}
        totalScore={totalScore}
        isCorrect={isCorrect}
      />
    </>
  );
}
