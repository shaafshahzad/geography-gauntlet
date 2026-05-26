function getTimerColor(timer: number): string {
  if (timer <= 30) return "text-destructive";
  if (timer <= 60) return "text-amber-500 dark:text-amber-400";
  return "text-primary dark:text-primary";
}

export function QuizCountdown({
  timer,
  totalScore,
}: {
  timer: number;
  totalScore: number;
}) {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col items-start gap-0.5">
        <p className={`text-4xl font-bold tabular-nums transition-colors duration-300 ${getTimerColor(timer)}`}>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </p>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          remaining
        </p>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <p className="text-3xl font-bold tabular-nums text-foreground">
          {totalScore}<span className="text-lg text-muted-foreground">/197</span>
        </p>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          identified
        </p>
      </div>
    </div>
  );
}
