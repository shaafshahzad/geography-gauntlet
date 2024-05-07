import { useEffect } from "react";
import { updateStats } from "~/lib/utils/update-stats";

export const useGauntletTimer = (
  isActive: boolean,
  isStarted: boolean,
  gameOver: boolean,
  setGameOver: (value: boolean) => void,
  updateScore: (func: (score: number) => number) => void,
  userId: string | undefined,
  totalScore: number,
) => {
  useEffect(() => {
    if (!isActive || !isStarted || gameOver) return;

    const interval = setInterval(() => {
      updateScore((score) => {
        if (score <= 1) {
          clearInterval(interval);
          setGameOver(true);
          updateStats(userId, "gauntlet_time", totalScore.toString());
          return 0;
        }
        return score - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isStarted, gameOver]);
};
