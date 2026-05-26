import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
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
      <Card className="flex w-full flex-col items-center justify-center border-l-4 border-l-destructive p-10">
        <CardContent className="flex w-full flex-col gap-8 px-0 pb-0 pt-2 lg:flex-row">
          <div className="flex w-full flex-col gap-6 lg:w-1/2">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span className="text-sm font-semibold uppercase tracking-widest text-destructive">High Stakes</span>
              </div>
              <h1 className="font-heading text-3xl font-bold">The Gauntlet</h1>
              <p className="mt-2 text-muted-foreground">
                The ultimate test of geographical knowledge under pressure.
              </p>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-xs font-bold text-destructive">15</span>
                <span>You have <strong>15 seconds</strong> to answer each question correctly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs">⚡</span>
                <span>Faster answers earn <strong>more points</strong> — score equals remaining seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-xs font-bold text-destructive">✕</span>
                <span>Time runs out or wrong answer? <strong>Game over immediately</strong></span>
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-8 lg:w-1/2">
            <Image
              src="/gauntlet.png"
              width={220}
              height={220}
              alt="Gauntlet"
              className="opacity-90"
              priority={true}
            />
            <Button
              className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              size="lg"
              onClick={startGame}
            >
              Enter the Gauntlet
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
