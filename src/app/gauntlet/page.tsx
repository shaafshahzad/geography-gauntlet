import { generateQuestion } from "~/app/lib/utils/generate-question";
import { GauntletClient } from "../_components/gauntlet/gauntlet-client";

export default async function Gauntlet() {
  const question = await generateQuestion();

  return (
    <div>
      <h1>Geography Gauntlet</h1>
      <GauntletClient initialQuestion={question} />
    </div>
  );
}
