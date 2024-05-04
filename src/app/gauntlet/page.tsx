import { generateQuestion } from "~/app/lib/utils/generate-question";
import { GauntletClient } from "../_components/gauntlet/gauntlet-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function Gauntlet() {
  const question = await generateQuestion();
  const user = await currentUser();

  if (!user) {
    console.log("User not authenticated or not found");
    return null;
  }

  return (
    <div>
      <h1>Geography Gauntlet</h1>
      <GauntletClient initialQuestion={question} userId={user.id} />
    </div>
  );
}
