"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapWrapper } from "../country-quiz/map-wrapper";
import { QuizControls } from "../quiz-controls";
import { QuizCountdown } from "../quiz-countdown";
import { fetchCountries } from "~/lib/utils/fetch-countries";
import { RestartScreen } from "../restart-screen";
import { updateStats } from "~/lib/utils/update-stats";
import { useToast } from "~/components/ui/use-toast";
import { Card, CardContent } from "~/components/ui/card";
import { CountryQuizStartScreen } from "./country-quiz-start-screen";

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
  const [timer, setTimer] = useState(1080);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isStarted) {
      const startGame = async () => {
        try {
          const countries = await fetchCountries();
          if (countries) {
            setCountries(countries);
          }
          setElapsedTime(0);
          setTimer(1080);

          intervalRef.current = setInterval(() => {
            setTimer((prev) => {
              if (prev <= 1) {
                clearInterval(intervalRef.current!);
                setElapsedTime(1080);
                setGameOver(true);
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
  }, [isStarted, userId]);

  useEffect(() => {
    if (gameOver) {
      updateStats(userId, "country_quiz_time", elapsedTime).catch(
        console.error,
      );
      updateStats(userId, "country_quiz_score", totalScore).catch(
        console.error,
      );
      setIsStarted(false);
    }
  }, [gameOver, totalScore, userId]);

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

        if (guessedCountries.length + 1 === countries.length) {
          clearInterval(intervalRef.current!);
          setElapsedTime(1080 - timer);
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
    setIsStarted(true);
    setGuessedCountries([]);
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
    return (
      <CountryQuizStartScreen isStarted={isStarted} startGame={startQuiz} />
    );
  }

  return (
    <div className="flex h-[90%] w-full flex-col items-center justify-center gap-10">
      <Card className="h-full w-full items-center justify-center px-5 py-5 sm:p-10">
        <CardContent className="flex h-full w-full flex-col items-center justify-center space-y-10 px-0 pb-0">
          <QuizCountdown timer={timer} totalScore={totalScore} />
          <MapWrapper guessedCountries={guessedCountries} />
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
