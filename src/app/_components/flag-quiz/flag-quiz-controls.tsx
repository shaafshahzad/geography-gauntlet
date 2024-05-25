import React from "react";
import { Input } from "~/components/ui/input";

interface QuizControlsProps {
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isCorrect: boolean | null;
}

export function QuizControls({
  answer,
  onAnswerChange,
  onSubmit,
  onKeyDown,
  isCorrect,
}: QuizControlsProps) {
  return (
    <div className={`w-1/2 ${isCorrect === false ? "shake-animation" : ""}`}>
      <Input
        type="text"
        placeholder="Enter Country Name"
        className="w-full"
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {isCorrect === false && (
        <p className="mt-2 animate-[wave_1s_ease-in-out_infinite] text-sm text-red-500">
          Incorrect Answer
        </p>
      )}
    </div>
  );
}
