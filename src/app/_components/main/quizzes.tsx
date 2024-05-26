"use client";

import { Card, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export function Quizzes() {
  const router = useRouter();

  return (
    <Card className="flex h-1/2 w-full flex-col gap-4 p-5">
      <CardTitle>Quizzes</CardTitle>
      <CardContent className="flex h-full justify-between gap-11 pb-0">
        <div className="flex w-1/2 flex-col justify-between">
          <p>Click to start a country quiz</p>
          <Button
            onClick={() => router.push("/country-quiz")}
            className="w-full"
          >
            Start Country Quiz
          </Button>
        </div>
        <div className="flex w-1/2 flex-col justify-between">
          <p>Click to start a flag quiz</p>
          <Button onClick={() => router.push("/flag-quiz")} className="w-full">
            Start Flag Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
