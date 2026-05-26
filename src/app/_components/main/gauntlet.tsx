"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/navigation";
import { Globe } from "~/components/ui/globe";

export function Gauntlet() {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-row lg:gap-5">
      <Card className="flex h-full w-full flex-col gap-4 border-l-4 border-l-destructive p-5 lg:w-1/2">
        <CardTitle className="font-heading flex items-center gap-2 text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-destructive"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Gauntlet
        </CardTitle>
        <CardContent className="flex h-full w-full flex-col justify-between gap-4 px-1 pb-0 sm:px-6">
          <p className="text-xl font-semibold italic text-foreground/80">
            Test your geography knowledge under pressure!
          </p>
          <div className="flex flex-grow flex-col items-start justify-end gap-3 md:flex-row md:items-center">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/15 text-xs font-bold text-destructive">15</span>
                <span>seconds to answer each question</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent-foreground">⚡</span>
                <span>Score points by answering quickly</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/15 text-xs font-bold text-destructive">✕</span>
                <span>Time up or wrong? <strong>Game over.</strong></span>
              </div>
            </div>
          </div>
          <Button
            className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => router.push("/gauntlet")}
          >
            Start Gauntlet
          </Button>
        </CardContent>
      </Card>
      <div className="invisible flex h-full w-0 flex-col items-center justify-center lg:visible lg:w-1/2">
        <Globe />
      </div>
    </div>
  );
}
