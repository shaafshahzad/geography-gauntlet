"use client";

import { useState } from "react";
import { validateAnswer } from "~/lib/utils/validate-answer";

export function GauntletSubmit({
  questionId,
  answerSearchParam,
}: {
  questionId: number;
  answerSearchParam: string;
}) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    const isValid = await validateAnswer(questionId, answer, answerSearchParam);
    setResult(isValid ? "Correct Answer!" : "Wrong Answer, try again!");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {result && <p>{result}</p>}
    </div>
  );
}
