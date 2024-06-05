import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import Image from "next/image";

export function GauntletStartScreen({
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
          Welcome to the Gauntlet!
        </CardTitle>
        <CardContent className="flex gap-10 space-y-10 pb-0 pt-5">
          <div className="flex w-1/2 flex-col space-y-5">
            <p>
              The Gauntlet is the ultimate test of your geographical knowledge
              and quick thinking. In this fast-paced game, you&apos;ll face a
              series of challenging questions, each designed to test a different
              aspect of your geography skills. You have only <b>10 seconds</b>{" "}
              to answer each question correctly. If you fail to answer in time
              or make a mistake, it&apos;s <b>game over!</b>
            </p>
            <h2 className="text-lg font-bold">How to Play:</h2>
            <ul className="list-inside list-disc">
              <b>Question Types:</b>
              <ul className="ml-5 list-inside list-disc">
                <li>
                  <b>Capitals:</b> Given a country, name its capital.
                </li>
                <li>
                  <b>Countries:</b> Given a capital, name its country.
                </li>
                <li>
                  <b>Flags:</b> Name a country based on the specified flag
                  color.
                </li>
                <li>
                  <b>Population:</b> Name a country that has a higher or lower
                  population than a given number.
                </li>
                <li>
                  <b>Name Length:</b> Name countries with a specified number of
                  letters.
                </li>
                <li>
                  <b>Starts/Ends With:</b> Name a country that starts or ends
                  with a specific letter.
                </li>
              </ul>
              <b>Scoring:</b> Your score for each question is based on the time
              you have remaining when you answer correctly. The faster you
              answer, the higher your score!
              <br />
              <b>Spelling:</b> Be precise with your spelling. Abbreviations like
              &quot;USA&quot; or &quot;DRC&quot; won&apos;t be accepted. Use
              full country names like &quot;United States&quot; or
              &quot;Democratic Republic of the Congo&quot;.
            </ul>
            <h2 className="text-lg font-bold">Tips for Success:</h2>
            <ul className="list-inside list-disc">
              <li>Stay calm and think quickly.</li>
              <li>
                Brush up on your world capitals, flags, and country names.
              </li>
              <li>
                Practice makes perfect – the more you play, the better
                you&apos;ll get!
              </li>
            </ul>
          </div>
          <div className="flex w-1/2 flex-col justify-between">
            <div className="flex flex-grow items-center justify-center">
              <Image
                src="/gauntlet.png"
                width={350}
                height={350}
                alt="Gauntlet page image"
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
