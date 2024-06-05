import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import Image from "next/image";

export function CountryQuizStartScreen({
  isStarted,
  startGame,
}: {
  isStarted: boolean;
  startGame: () => void;
}) {
  if (!isStarted) {
    return (
      <Card className="flex w-full flex-col items-center justify-center p-10">
        <CardTitle className="mb-5 text-center text-3xl">
          Welcome to the Country Quiz!
        </CardTitle>
        <CardContent className="flex gap-10 space-y-10 pb-0 pt-5">
          <div className="flex w-1/2 flex-col space-y-5">
            <p>
              Think you know all the countries in the world? Test your knowledge
              with our Country Quiz! You have a set amount of time to name as
              many countries as possible. Try to get all the countries in the
              shortest amount of time.
            </p>
            <h2 className="text-lg font-bold">How to Play:</h2>
            <ul>
              <li>
                <b>Objective:</b> Name all the countries in the world within the
                time limit.
              </li>
              <li>
                <b>Scoring:</b> Your score is based on how many countries you
                can correctly name before time runs out.
              </li>
              <li>
                <b>Spelling:</b> Be precise with your spelling. Abbreviations
                like "USA" or "DRC" won&apos;t be accepted. Use full country
                names like "United States" or "Democratic Republic of the
                Congo".
              </li>
            </ul>
            <h2 className="text-lg font-bold">Tips for Success:</h2>
            <ul className="list-inside list-disc">
              <li>Brush up on your world geography.</li>
              <li>
                Practice makes perfect – the more you play, the better you'll
                get!
              </li>
            </ul>
          </div>
          <div className="flex w-1/2 flex-col justify-between">
            <div className="flex flex-grow items-center justify-center">
              <Image
                src="/country-quiz.png"
                width={450}
                height={450}
                alt="Country quiz page image"
                className="align-middle"
              />
            </div>
            <div className="flex justify-end">
              <Button className="w-full" onClick={startGame}>
                Click to Start
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
