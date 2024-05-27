"use client";

import React, { useState, useEffect } from "react";
import { MapWrapper } from "../country-quiz/map-wrapper";
import { QuizControls } from "../quiz-controls";
import { QuizCountdown } from "../quiz-countdown";
import { QuizStart } from "../quiz-start";
import { fetchCountries } from "~/lib/utils/fetch-countries";
import { QuizRestart } from "../quiz-restart";
import { updateStats } from "~/lib/utils/update-stats";
import { useToast } from "~/components/ui/use-toast";

interface Country {
  country_id: number;
  name: string;
  flag_url: string;
}

export function CountryQuizClient({ userId }: { userId?: string }) {
  const [answer, setAnswer] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [guessedCountries, setGuessedCountries] = useState<Country[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [timer, setTimer] = useState(1080);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (isStarted) {
      const startGame = async () => {
        const countries = await fetchCountries();
        if (countries) {
          setCountries(countries);
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
                "country_quiz_time",
                Math.floor(elapsedTime).toString(),
              );
              updateStats(userId, "country_quiz_score", totalScore.toString());
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
      updateStats(
        userId,
        "country_quiz_time",
        Math.floor(elapsedTime).toString(),
      );
      updateStats(userId, "country_quiz_score", totalScore.toString());
    }
  }, [gameOver, elapsedTime]);

  const handleSubmit = async () => {
    if (answer && countries) {
      const country = countries.find(
        (c) =>
          c.name.toLowerCase().replace(/[^a-zA-Z]/g, "") ===
          answer.toLowerCase().replace(/[^a-zA-Z]/g, ""),
      );

      if (country) {
        if (guessedCountries.includes(country)) {
          setAnswer("");
          toast({
            variant: "warning",
            title: `Already Guessed ${country.name}!`,
            description: "Try another country!",
          });
          return;
        }

        setTotalScore((prev) => prev + 1);
        setGuessedCountries((prev) => [...prev, country]);
        setAnswer("");
        toast({
          title: "Correct!",
          description: `${country.name} is a country!`,
        });

        if (countries.length === 0) {
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

  const startQuiz = () => {
    setAnswer("");
    setTotalScore(0);
    setGameOver(false);
    setTimer(1080);
    setElapsedTime(0);
    setIsStarted(true);
    setGuessedCountries([]);
    setStartTime(Date.now());
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
      <QuizCountdown timer={timer} totalScore={totalScore} />
      <MapWrapper guessedCountries={guessedCountries} />
      <QuizControls
        answer={answer}
        onAnswerChange={setAnswer}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
