export function FlagQuizStart(startQuiz: () => void) {
  return (
    <div>
      <button onClick={startQuiz}>Click to Start</button>
    </div>
  );
}
