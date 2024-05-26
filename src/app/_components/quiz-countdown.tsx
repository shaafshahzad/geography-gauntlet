export function QuizCountdown({
  timer,
  totalScore,
}: {
  timer: number;
  totalScore: number;
}) {
  return (
    <div className="">
      <p>Countries Guessed: {totalScore}/197</p>
      <p>
        Time Left: {Math.floor(timer / 60)}:
        {(timer % 60).toString().padStart(2, "0")}
      </p>
    </div>
  );
}
