import { CountryQuizClient } from "../_components/country-quiz/country-quiz-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function CountryQuiz() {
  const user = await currentUser();

  return (
    <div className="flex h-full flex-col justify-between gap-5 pt-8 md:h-[calc(100vh-136px)] md:pt-14">
      <CountryQuizClient userId={user?.id} />
    </div>
  );
}
