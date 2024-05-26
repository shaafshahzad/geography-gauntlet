export function QuizStart(startQuiz: () => void) {
  return (
    <div>
      <button onClick={startQuiz}>Click to Start</button>
    </div>
  );
}
