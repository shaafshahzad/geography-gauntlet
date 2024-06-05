import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import Image from "next/image";

export function FlagQuizStartScreen({
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
          Welcome to the Flag Quiz!
        </CardTitle>
        <CardContent className="flex gap-10 space-y-10 pb-0 pt-5">
          <div className="flex w-1/2 flex-col space-y-5">
            <p>
              Think you know all the flags in the world? Test your knowledge
              with our Flag Quiz! You will be shown a series of flags, and you
              need to correctly identify the country each flag belongs to. Try
              to get all the flags in the shortest amount of time.
            </p>
            <h2 className="text-lg font-bold">How to Play:</h2>
            <ul>
              <li>
                <b>Objective:</b> Identify the country for each displayed flag.
              </li>
              <li>
                <b>Scoring:</b> Your score is based on how many flags you can
                correctly identify within the time limit.
              </li>
              <li>
                <b>Spelling:</b> Be precise with your spelling. Abbreviations
                like &quot;USA&quot; or &quot;DRC&quot; won&apos;t be accepted.
                Use full country names like &quot;United States&quot; or
                &quot;Democratic Republic of the Congo&quot;.
              </li>
            </ul>
            <h2 className="text-lg font-bold">Tips for Success:</h2>
            <ul className="list-inside list-disc">
              <li>Study world flags and their corresponding countries.</li>
              <li>
                Practice regularly to improve your flag identification skills.
              </li>
            </ul>
          </div>
          <div className="flex w-1/2 flex-col justify-between">
            <div className="flex flex-grow items-center justify-center">
              <Image
                src="/flag-quiz.png"
                width={250}
                height={250}
                alt="Flag quiz page image"
                className="align-middle"
                priority={true}
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
