import { FlagQuizClient } from "../_components/flag-quiz/flag-quiz-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function FlagQuiz() {
  const user = await currentUser();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-5">
      <FlagQuizClient userId={user?.id} />
    </div>
  );
}
