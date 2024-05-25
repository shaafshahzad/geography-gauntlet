import { FlagQuizClient } from "../_components/flag-quiz/flag-quiz-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function FlagQuiz() {
  const user = await currentUser();

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <FlagQuizClient userId={user?.id} />
    </div>
  );
}
