import { CountryQuizClient } from "../_components/country-quiz/country-quiz-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function CountryQuiz() {
  const user = await currentUser();

  return (
    <div className="flex h-[calc(100vh-136px)] w-full flex-col items-center justify-center">
      <CountryQuizClient userId={user?.id} />
    </div>
  );
}
