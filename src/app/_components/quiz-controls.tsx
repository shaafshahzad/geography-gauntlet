import React from "react";
import { Input } from "~/components/ui/input";

interface QuizControlsProps {
  answer: string;
  onAnswerChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function QuizControls({
  answer,
  onAnswerChange,
  onKeyDown,
}: QuizControlsProps) {
  return (
    <div className="w-1/2">
      <Input
        type="text"
        placeholder="Enter Country Name"
        className="w-full"
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
