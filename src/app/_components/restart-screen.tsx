import { formatTime } from "~/lib/utils/format-time";
import { Card, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

interface RestartScreenProps {
  totalScore: number;
  questionNumber: number;
  elapsedTime: number;
  restart: () => void;
  isGauntlet: boolean;
}

export function RestartScreen({
  totalScore,
  questionNumber,
  elapsedTime,
  restart,
  isGauntlet,
}: RestartScreenProps) {
  return (
    <Card className="flex w-full flex-col items-center justify-center p-10">
      <CardTitle className="mb-5 text-center text-3xl">Game Over!</CardTitle>
      <CardContent className="flex flex-col gap-10 space-y-10 pb-0 pt-5">
        {isGauntlet ? (
          <p className="text-center text-xl">
            You scored <b>{totalScore}</b> points in <b>{questionNumber - 1}</b>{" "}
            questions.
          </p>
        ) : (
          <p className="text-center text-xl">
            You guessed <b>{totalScore}/197</b> countries in{" "}
            <b>{formatTime(Math.floor(elapsedTime).toString())} seconds</b>.
          </p>
        )}
        <Button className="w-full" onClick={restart}>
          Restart Game
        </Button>
      </CardContent>
    </Card>
  );
}
