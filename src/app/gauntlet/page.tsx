import { generateQuestion } from "~/lib/utils/generate-question";
import { GauntletClient } from "../_components/gauntlet/gauntlet-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function Gauntlet() {
  const question = await generateQuestion();
  const user = await currentUser();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-5">
      <GauntletClient initialQuestion={question} userId={user?.id} />
    </div>
  );
}
