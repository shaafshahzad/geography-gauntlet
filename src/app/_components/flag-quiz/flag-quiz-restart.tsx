import { formatTime } from "~/lib/utils/format-time";

interface FlagQuizRestartProps {
  totalScore: number;
  elapsedTime: number;
  startQuiz: () => void;
}

export function FlagQuizRestart({
  totalScore,
  elapsedTime,
  startQuiz,
}: FlagQuizRestartProps) {
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
