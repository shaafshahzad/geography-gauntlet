"use client";

import { Card, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export function Quizzes() {
  const router = useRouter();

  return (
    <Card className="flex h-full w-full flex-col gap-4 p-5">
      <CardTitle className="font-heading flex items-center gap-2 text-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M12 22V8" />
          <path d="m5 12-2-7 7 2 2-7 2 7 7-2-2 7-7-2z" />
        </svg>
        Quizzes
      </CardTitle>
      <CardContent className="flex h-full flex-col justify-between gap-10 px-1 pb-0 sm:px-6 md:flex-row md:gap-[98px]">
        <div className="flex w-full flex-col justify-between gap-4 rounded-lg border-l-4 border-l-primary/60 pl-4 md:w-1/2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <p className="text-lg font-semibold">Country Quiz</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Name all 197 countries in the world within the time limit.
            </p>
          </div>
          <Button
            onClick={() => router.push("/country-quiz")}
            className="w-full"
          >
            Start Country Quiz
          </Button>
        </div>

        <div className="flex w-full flex-col justify-between gap-4 rounded-lg border-l-4 border-l-accent/80 pl-4 md:w-1/2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-foreground dark:text-accent"
              >
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" x2="4" y1="22" y2="15" />
              </svg>
              <p className="text-lg font-semibold">Flag Quiz</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Identify the country behind each of the world&apos;s 197 flags.
            </p>
          </div>
          <Button
            onClick={() => router.push("/flag-quiz")}
            variant="outline"
            className="w-full border-accent/50 hover:bg-accent/10"
          >
            Start Flag Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
