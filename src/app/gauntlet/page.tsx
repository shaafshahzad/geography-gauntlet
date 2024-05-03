import { generateQuestion } from "~/lib/utils/generate-question";

export default async function Gauntlet() {
  const question = await generateQuestion();

  return (
    <div>
      <h1>gauntlet</h1>
      <p>Question: {question.question}</p>
      <p>Template: {question.template}</p>
    </div>
  );
}
