"use client";

import { Card, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export function Quizzes() {
  const router = useRouter();

  return (
    <Card className="flex w-full flex-col p-5">
      <CardTitle>Quizzes</CardTitle>
      <CardContent className="flex justify-between">
        <div>
          <p>Click to start a country quiz</p>
          <Button onClick={() => router.push("/country-quiz")}>Start</Button>
        </div>
        <div>
          <p>Click to start a flag quiz</p>
          <Button onClick={() => router.push("/flag-quiz")}>Start</Button>
        </div>
      </CardContent>
    </Card>
  );
}
