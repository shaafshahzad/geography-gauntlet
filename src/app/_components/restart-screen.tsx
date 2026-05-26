import { formatTime } from "~/lib/utils/format-time";
import { Card, CardContent } from "~/components/ui/card";
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
    <Card className="flex w-full flex-col items-center justify-center border-l-4 border-l-destructive p-10">
      <CardContent className="flex w-full flex-col items-center gap-8 pb-0 pt-2">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-destructive"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight">
            Game Over
          </h2>
          <p className="text-sm text-muted-foreground">
            {isGauntlet ? "The gauntlet has ended" : "Time's up, explorer!"}
          </p>
        </div>

        <div className="w-full rounded-lg bg-muted/50 px-6 py-5 text-center">
          {isGauntlet ? (
            <div className="flex flex-col gap-1">
              <p className="text-5xl font-bold text-primary">{totalScore}</p>
              <p className="text-sm font-medium text-muted-foreground">points scored</p>
              <p className="mt-2 text-base">
                Answered{" "}
                <span className="font-semibold text-foreground">
                  {questionNumber - 1}
                </span>{" "}
                {questionNumber - 1 === 1 ? "question" : "questions"} correctly
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-5xl font-bold text-primary">{totalScore}<span className="text-2xl text-muted-foreground">/197</span></p>
              <p className="text-sm font-medium text-muted-foreground">countries identified</p>
              <p className="mt-2 text-base">
                Finished in{" "}
                <span className="font-semibold text-foreground">
                  {formatTime(Math.floor(elapsedTime).toString())}
                </span>
              </p>
            </div>
          )}
        </div>

        <Button className="w-full" size="lg" onClick={restart}>
          Play Again
        </Button>
      </CardContent>
    </Card>
  );
}
