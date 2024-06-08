import { CountryQuizClient } from "../_components/country-quiz/country-quiz-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function CountryQuiz() {
  const user = await currentUser();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-5">
      <CountryQuizClient userId={user?.id} />
    </div>
  );
}
