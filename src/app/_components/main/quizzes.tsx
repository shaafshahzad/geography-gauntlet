"use client";

import { Card, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export function Quizzes() {
  const router = useRouter();

  return (
    <Card className="flex w-full flex-col gap-4 p-5">
      <CardTitle>Quizzes</CardTitle>
      <CardContent className="flex h-full flex-col justify-between gap-10 px-1 pb-0 sm:px-6 md:flex-row md:gap-[98px]">
        <div className="flex w-full flex-col justify-between md:w-1/2">
          <div className="mb-2 flex flex-row">
            <div className="flex flex-col">
              <p className="text-lg font-medium italic">
                How well do you know the world?
              </p>
              <p className="text-md">
                Name all the countries in the world within the time limit.
              </p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/country-quiz")}
            className="w-full"
          >
            Start Country Quiz
          </Button>
        </div>
        <div className="flex w-full flex-col justify-between md:w-1/2">
          <div className="mb-2 flex flex-row">
            <div className="flex flex-col">
              <p className="text-lg font-medium italic">
                How well do you know world flags?
              </p>
              <p className="text-md">
                Identify the country each flag belongs to within the time limit.
              </p>
            </div>
          </div>
          <Button onClick={() => router.push("/flag-quiz")} className="w-full">
            Start Flag Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
