import { generateQuestion } from "~/lib/utils/generate-question";
import { GauntletSubmit } from "../_components/gauntlet-submit";

export default async function Gauntlet() {
  const question = await generateQuestion();

  return (
    <div>
      <h1>gauntlet</h1>
      <p>Question: {question.question}</p>
      <p>Template: {question.template}</p>
      <p>Search param for answer: {question.answerSearchParam}</p>
      <GauntletSubmit
        questionId={question.templateId}
        answerSearchParam={question.answerSearchParam}
      />
    </div>
  );
}
