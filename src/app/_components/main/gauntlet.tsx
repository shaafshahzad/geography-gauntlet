"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/navigation";

export function Gauntlet() {
  const router = useRouter();

  return (
    <Card className="flex h-1/2 w-full flex-col gap-4 p-5">
      <CardTitle>Gauntlet</CardTitle>
      <CardContent className="flex h-full w-full justify-between gap-11 pb-0">
        <div className="flex w-1/2 flex-col justify-between">
          <p>Click to start a gauntlet game</p>
        </div>
        <div className="flex w-1/2 flex-col justify-between">
          <p>something something idk</p>
          <Button onClick={() => router.push("/gauntlet")}>
            Start Gauntlet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
