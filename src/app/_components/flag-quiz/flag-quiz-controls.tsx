import React from "react";
import { Input } from "~/components/ui/input";

interface QuizControlsProps {
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  timer: number;
  totalScore: number;
  isCorrect: boolean | null;
}

export function QuizControls({
  answer,
  onAnswerChange,
  onSubmit,
  onKeyDown,
  timer,
  totalScore,
  isCorrect,
}: QuizControlsProps) {
  return (
    <>
      <p>Countries Guessed: {totalScore}/196</p>
      <p>
        Time Left: {Math.floor(timer / 60)}:
        {(timer % 60).toString().padStart(2, "0")}
      </p>
      <Input
        type="text"
        placeholder="Enter Country Name"
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {isCorrect === true ? (
        <p>Correct!</p>
      ) : isCorrect === false ? (
        <p>Incorrect!</p>
      ) : null}
    </>
  );
}
