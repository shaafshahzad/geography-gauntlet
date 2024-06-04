export function QuizCountdown({
  timer,
  totalScore,
}: {
  timer: number;
  totalScore: number;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-1">
      <p className="text-4xl font-medium">
        {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
      </p>
      <p className="text-xl font-light">{totalScore}/197</p>
    </div>
  );
}
