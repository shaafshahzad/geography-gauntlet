import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
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
      <Card className="flex w-full flex-col items-center justify-center border-l-4 border-l-accent/80 p-10">
        <CardContent className="flex w-full flex-col gap-8 px-0 pb-0 pt-2 lg:flex-row">
          <div className="flex w-full flex-col gap-6 lg:w-1/2">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-foreground dark:text-accent">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" x2="4" y1="22" y2="15" />
                </svg>
                <span className="text-sm font-semibold uppercase tracking-widest text-accent-foreground dark:text-accent">Vexillology</span>
              </div>
              <h1 className="font-heading text-3xl font-bold">Flag Quiz</h1>
              <p className="mt-2 text-muted-foreground">
                Can you identify all 197 flags of the world?
              </p>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold">18</span>
                <span>You have <strong>18 minutes</strong> to identify as many flags as possible</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs">🚩</span>
                <span>Use the arrows to <strong>navigate between flags</strong> — tackle them in any order</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold">✓</span>
                <span>Correctly identified flags are <strong>removed</strong> from the deck</span>
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-8 lg:w-1/2">
            <Image
              src="/flag-quiz.png"
              width={200}
              height={200}
              alt="Flag Quiz"
              className="opacity-90"
              priority={true}
            />
            <Button
              className="w-full border-accent/50 hover:bg-accent/10"
              variant="outline"
              size="lg"
              onClick={startGame}
            >
              Start Identifying
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
