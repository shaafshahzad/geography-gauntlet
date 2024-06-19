"use client";

import React, { useState } from "react";
import { validateAnswer } from "~/lib/utils/validate-answer";
import { useGauntletTimer } from "~/lib/hooks/use-gauntlet-timer";
import { fetchQuestion } from "~/lib/utils/fetch-question";
import { useToast } from "~/components/ui/use-toast";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { GauntletStartScreen } from "./gauntlet-start-screen";
import { RestartScreen } from "../restart-screen";

interface Question {
  question: string;
  template: string;
  answerSearchParam: string;
  templateId: number;
}

interface GauntletClientProps {
  initialQuestion: Question;
  userId?: string;
}

interface GauntletState {
  question: Question;
  answer: string;
  timer: number;
  totalScore: number;
  gameOver: boolean;
  isCorrect: boolean | null;
  timerActive: boolean;
  isStarted: boolean;
  questionNumber: number;
}

export function GauntletClient({
  initialQuestion,
  userId,
}: GauntletClientProps) {
  const [state, setState] = useState<GauntletState>({
    question: initialQuestion,
    answer: "",
    timer: 10,
    totalScore: 0,
    gameOver: false,
    isCorrect: null,
    timerActive: true,
    isStarted: false,
    questionNumber: 1,
  });
  const { toast } = useToast();

  useGauntletTimer(
    state.timerActive,
    state.isStarted,
    state.gameOver,
    (value) => setState((s) => ({ ...s, gameOver: value })),
    (func) => setState((s) => ({ ...s, timer: func(s.timer) })),
    userId,
    state.totalScore,
  );

  const startGame = async () => {
    try {
      const res = await fetch("/api/gauntletQuestion", { method: "GET" });
      const newQuestion: Question = (await res.json()) as Question;

      setState((prevState) => ({
        ...prevState,
        question: newQuestion,
        answer: "",
        totalScore: 0,
        gameOver: false,
        isCorrect: null,
        timer: 10,
        timerActive: true,
        isStarted: true,
        questionNumber: 1,
      }));
    } catch (error) {
      console.error("Failed to fetch new question", error);
    }
  };

  const handleSubmit = async () => {
    setState((s) => ({ ...s, timerActive: false, answer: "" }));

    const isValid = await validateAnswer(
      state.question.templateId,
      state.answer,
      state.question.answerSearchParam,
    );

    setState((s) => ({
      ...s,
      isCorrect: isValid,
      totalScore: isValid ? s.totalScore + s.timer : s.totalScore,
      timerActive: !isValid,
    }));

    if (isValid) {
      toast({
        title: "Correct!",
        description: `${state.answer} was a valid answer!`,
      });
      await fetchQuestion(setState, state.questionNumber + 1);
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect",
        description: "Try again!",
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit().catch(console.error);
    }
  };

  const {
    gameOver,
    isStarted,
    timer,
    totalScore,
    answer,
    question,
    questionNumber,
  } = state;

  if (gameOver) {
    return (
      <RestartScreen
        totalScore={totalScore}
        questionNumber={questionNumber}
        elapsedTime={0}
        restart={startGame}
        isGauntlet={true}
      />
    );
  }

  if (!isStarted) {
    return <GauntletStartScreen isStarted={isStarted} startGame={startGame} />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <Card className="h-full w-full items-center justify-center px-5 py-10 sm:p-10">
        <CardContent className="w-full space-y-2 pb-0 sm:space-y-10">
          <div className="flex w-full flex-col items-center justify-center space-y-1">
            <p className="text-4xl font-medium">{timer}</p>
            <p className="text-xl font-light">Score: {totalScore}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 py-5 text-center sm:py-20">
            <p className="text-lg">Question {questionNumber}</p>
            <p className="text-2xl">{question.question}</p>
          </div>
          <Input
            type="text"
            value={answer}
            onChange={(e) => setState({ ...state, answer: e.target.value })}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here"
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  );
}
