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
        <CardContent className="flex flex-col gap-10 px-0 pb-0 pt-5 sm:space-y-10 sm:px-6 lg:flex-row">
          <div className="flex w-full flex-col space-y-5 lg:w-1/2">
            <p>
              Think you know all the countries in the world? Test your knowledge
              with our Country Quiz! You have a set amount of time to name as
              many countries as possible. Try to get all the countries in the
              shortest amount of time.
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-10 lg:w-1/2">
            <Image
              src="/country-quiz.png"
              width={200}
              height={200}
              alt="Country quiz page image"
              className="crop-center align-middle"
              priority={true}
            />
            <Button className="w-full" onClick={startGame}>
              Click to Start
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
