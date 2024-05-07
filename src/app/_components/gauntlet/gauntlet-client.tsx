"use client";

import React, { useState } from "react";
import { validateAnswer } from "~/lib/utils/validate-answer";
import { useGauntletTimer } from "~/lib/hooks/use-gauntlet-timer";
import { fetchQuestion } from "~/lib/utils/fetch-question";

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

export function GauntletClient({
  initialQuestion,
  userId,
}: GauntletClientProps) {
  const [state, setState] = useState({
    question: initialQuestion,
    answer: "",
    timer: 10,
    totalScore: 0,
    gameOver: false,
    isCorrect: null as null | boolean,
    timerActive: true,
    isStarted: false,
  });

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
    await fetchQuestion(setState);
    setState({
      ...state,
      answer: "",
      totalScore: 0,
      gameOver: false,
      isCorrect: null,
      timer: 10,
      timerActive: true,
      isStarted: true,
    });
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
      fetchQuestion(setState);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const {
    gameOver,
    isStarted,
    timer,
    totalScore,
    answer,
    question,
    isCorrect,
  } = state;

  if (gameOver) {
    return (
      <div>
        <h1>Game Over</h1>
        <p>Total Score: {totalScore}</p>
        <button onClick={startGame}>Restart Game</button>
      </div>
    );
  }

  if (!isStarted) {
    return <button onClick={startGame}>Click to Start</button>;
  }

  return (
    <div>
      <h1>Timer: {timer}</h1>
      <h1>Total Score: {totalScore}</h1>
      <p>Question: {question.question}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setState({ ...state, answer: e.target.value })}
        onKeyDown={handleKeyDown}
        placeholder="Type your answer here"
      />
      <button onClick={handleSubmit} disabled={!answer}>
        Submit
      </button>
      {isCorrect === true ? (
        <p>Correct!</p>
      ) : isCorrect === false ? (
        <p>Incorrect!</p>
      ) : null}
    </div>
  );
}
