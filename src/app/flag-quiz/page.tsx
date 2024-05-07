import { FlagQuizClient } from "../_components/flag-quiz/flag-quiz-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function FlagQuiz() {
  const user = await currentUser();

  return (
    <div>
      <h1>Flag Quiz</h1>
      <FlagQuizClient userId={user?.id} />
    </div>
  );
}
