import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
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
      <Card className="flex w-full flex-col items-center justify-center border-l-4 border-l-primary p-10">
        <CardContent className="flex w-full flex-col gap-8 px-0 pb-0 pt-2 lg:flex-row">
          <div className="flex w-full flex-col gap-6 lg:w-1/2">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">World Explorer</span>
              </div>
              <h1 className="font-heading text-3xl font-bold">Country Quiz</h1>
              <p className="mt-2 text-muted-foreground">
                How many of the world&apos;s 197 countries can you name?
              </p>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">18</span>
                <span>You have <strong>18 minutes</strong> to name as many countries as possible</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs">🗺</span>
                <span>Correctly guessed countries light up on the <strong>world map</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">✓</span>
                <span>Alternate spellings and names are <strong>accepted</strong></span>
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-8 lg:w-1/2">
            <Image
              src="/country-quiz.png"
              width={200}
              height={200}
              alt="Country Quiz"
              className="opacity-90"
              priority={true}
            />
            <Button className="w-full" size="lg" onClick={startGame}>
              Start Exploring
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
