"use client";

import React, { useState, useEffect } from "react";
import { validateAnswer } from "~/app/lib/utils/validate-answer";

interface Question {
  question: string;
  template: string;
  answerSearchParam: string;
  templateId: number;
}

interface QuestionResponse {
  ok: boolean;
  question?: Question;
}

interface GauntletClientProps {
  initialQuestion: Question;
  userId: string;
}

export function GauntletClient({
  initialQuestion,
  userId,
}: GauntletClientProps) {
  const [question, setQuestion] = useState<Question>(initialQuestion);
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(10);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);
  const [timerActive, setTimerActive] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!timerActive || !isStarted) return undefined;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
          try {
            fetch("/api/updateStats", {
              method: "POST",
              body: JSON.stringify({
                user_id: userId,
                target: "gauntlet_score",
                value: totalScore.toString(),
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => console.log("Update response:", data))
              .catch((error) => console.error("Failed to update stats", error));
          } catch (error) {
            console.error("Failed to update stats", error);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, isStarted, gameOver]);

  const fetchQuestion = async () => {
    try {
      const res = await fetch("/api/gauntletQuestion", { method: "POST" });
      const json = (await res.json()) as QuestionResponse;

      if (!json.ok || !json.question) {
        console.error("Failed to fetch new question");
        return;
      }

      setQuestion(json.question);
      setTimer(10);
      setTimerActive(true);
    } catch (error) {
      console.error("Failed to fetch new question", error);
      setTimerActive(true);
    }
  };

  const resetGame = async () => {
    try {
      await fetchQuestion();
      setAnswer("");
      setTotalScore(0);
      setGameOver(false);
      setIsCorrect(null);
      setTimer(10);
      setTimerActive(true);
      setIsStarted(true);
    } catch (error) {
      console.error("Failed to reset game", error);
    }
  };

  const startGame = () => {
    setIsStarted(true);
    setTimerActive(true);
    void resetGame();
  };

  const handleSubmit = async () => {
    try {
      setTimerActive(false);
      setAnswer("");

      const isValid = await validateAnswer(
        question.templateId,
        answer,
        question.answerSearchParam,
      );

      setIsCorrect(isValid);
      if (isValid) {
        setTotalScore(totalScore + timer);
        await fetchQuestion();
      } else {
        setTimerActive(true);
      }
    } catch (error) {
      console.error("Error in submitting answer", error);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      await handleSubmit();
    }
  };

  if (gameOver) {
    return (
      <div>
        <h1>Game Over</h1>
        <p>Total Score: {totalScore}</p>
        <button onClick={resetGame}>Restart Game</button>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div>
        <button onClick={startGame}>Click to Start</button>
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
        {isCorrect === true ? (
          <p>Correct!</p>
        ) : isCorrect === false ? (
          <p>Incorrect!</p>
        ) : null}
      </div>
    </div>
  );
}
