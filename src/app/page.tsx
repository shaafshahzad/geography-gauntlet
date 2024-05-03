import { generateQuestion } from "~/lib/utils/generate-question";

export default async function Home() {
  const question = await generateQuestion();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#67636d] to-[#9294be]">
      <div>
        <h1 className="text-center text-4xl font-bold text-white">
          Welcome to the Gauntlet
        </h1>
      </div>
      <div className="text-center text-white">
        <p>{question.question}</p>
        <p>{question.answer}</p>
      </div>
    </main>
  );
}
