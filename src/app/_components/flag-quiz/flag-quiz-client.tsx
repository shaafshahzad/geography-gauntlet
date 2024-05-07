"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Input } from "~/components/ui/input";
import { formatTime } from "~/lib/utils/format-time";
import { updateStats } from "~/lib/utils/update-stats";

interface Flag {
  country_id: string;
  name: string;
  flag_url: string;
}

interface FlagQuizClientProps {
  userId?: string;
}

export function FlagQuizClient({ userId }: FlagQuizClientProps) {
  const [countryFlags, setCountryFlags] = useState<Flag[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (isStarted) {
      fetchFlags();
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

  const fetchFlags = async () => {
    try {
      const res = await fetch("/api/countryFlags", { method: "GET" });
      const flags = await res.json();
      setCountryFlags(flags);
    } catch (error) {
      console.error("Failed to start quiz", error);
    }
  };

  const startQuiz = () => {
    setAnswer("");
    setIsCorrect(null);
    setTotalScore(0);
    setGameOver(false);
    setTimer(10);
    setElapsedTime(0);
    setIsStarted(true);
    setStartTime(Date.now());
  };

  const handleSubmit = async () => {
    if (answer && countryFlags[0]) {
      const currentFlag = countryFlags[0];
      if (
        //currentFlag.name.toLowerCase().replace(/[^a-zA-Z]/g, "")
        "a" === // REMOVE AFTER
        answer.toLowerCase().replace(/[^a-zA-Z]/g, "")
      ) {
        setIsCorrect(true);
        setTotalScore((prev) => prev + 1);
        const newFlags = countryFlags.slice(1);
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
        console.log("Correct answer is:", currentFlag?.name); // REMOVE AFTER TESTING
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
      <p>Countries Guessed: {totalScore}/196</p>
      <p>
        Time Left: {Math.floor(timer / 60)}:
        {(timer % 60).toString().padStart(2, "0")}
      </p>
      <Carousel>
        <CarouselPrevious>Previous</CarouselPrevious>
        <CarouselContent>
          {countryFlags.map((country) => (
            <CarouselItem key={country.country_id}>
              <Image
                src={country.flag_url}
                alt={country.name}
                width={100}
                height={100}
                className="h-auto w-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext>Next</CarouselNext>
      </Carousel>
      <Input
        type="text"
        placeholder="Enter Country Name"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {isCorrect === true ? (
        <p>Correct!</p>
      ) : isCorrect === false ? (
        <p>Incorrect!</p>
      ) : null}
    </>
  );
}
