"use client";

import React, { useState, useEffect } from "react";
import { validateAnswer } from "~/app/lib/utils/validate-answer";

interface Question {
  question: string;
  template: string;
  answerSearchParam: string;
  templateId: number;
}

interface GauntletClientProps {
  initialQuestion: Question;
}

export function GauntletClient({ initialQuestion }: GauntletClientProps) {
  const [question, setQuestion] = useState<Question>(initialQuestion);
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setGameOver(true);
      clearInterval(timer);
    }
  }, [timer]);

  const handleSubmit = async () => {
    setAnswer("");
    const isValid = await validateAnswer(
      question.templateId,
      answer,
      question.answerSearchParam,
    );
    if (isValid) {
      try {
        const res = await fetch("/api/gauntletQuestion", {
          method: "POST",
        });
        const newQuestion = await res.json();
        setQuestion(newQuestion);
        setTimer(10);
      } catch (error) {
        console.error("Failed to fetch new question", error);
      }
    } else {
      setGameOver(true);
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
        <button onClick={() => window.location.reload()}>Restart Game</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Timer: {timer}</h1>
      <p>Question: {question.question}</p>
      <div>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer here"
        />
        <button onClick={handleSubmit} disabled={!answer}>
          Submit
        </button>
      </div>
    </div>
  );
}
