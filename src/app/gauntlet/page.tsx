import { generateQuestion } from "~/lib/utils/generate-question";
import { GauntletClient } from "../_components/gauntlet/gauntlet-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function Gauntlet() {
  const question = await generateQuestion();
  const user = await currentUser();

  return (
    <div className="flex h-[calc(100vh-136px)] w-full flex-col items-center justify-center">
      <GauntletClient initialQuestion={question} userId={user?.id} />
    </div>
  );
}
