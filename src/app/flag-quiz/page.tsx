import { FlagQuizClient } from "../_components/flag-quiz/flag-quiz-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function FlagQuiz() {
  const user = await currentUser();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-5 sm:h-[calc(100vh-136px)]">
      <FlagQuizClient userId={user?.id} />
    </div>
  );
}
