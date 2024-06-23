import { generateQuestion } from "~/lib/utils/generate-question";
import { GauntletClient } from "../_components/gauntlet/gauntlet-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function Gauntlet() {
  const question = await generateQuestion();
  const user = await currentUser();

  return (
    <div className="flex h-full flex-col justify-between gap-5 pt-8 md:h-[calc(100vh-136px)] md:pt-14">
      <GauntletClient initialQuestion={question} userId={user?.id} />
    </div>
  );
}
