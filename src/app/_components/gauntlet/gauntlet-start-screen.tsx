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
        <CardContent className="flex flex-col gap-10 px-0 pb-0 pt-5 sm:space-y-10 sm:px-6 lg:flex-row">
          <div className="flex w-full flex-col space-y-5 lg:w-1/2">
            <p>
              The Gauntlet is the ultimate test of your geographical knowledge
              and quick thinking. In this fast-paced game, you&apos;ll face a
              series of challenging questions, each designed to test a different
              aspect of your geography skills. You have only <b>15 seconds</b>{" "}
              to answer each question correctly. If you fail to answer in time
              or make a mistake, it&apos;s <b>game over!</b>
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-10 lg:w-1/2">
            <Image
              src="/gauntlet.png"
              width={250}
              height={250}
              alt="Gauntlet page image"
              className="align-middle"
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
