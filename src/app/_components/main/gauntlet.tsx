"use client";

import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/navigation";

export function Gauntlet() {
  const router = useRouter();

  return (
    <Card>
      <CardTitle>Gauntlet</CardTitle>
      <CardContent>
        <p>Click to start a gauntlet game</p>
        <Button onClick={() => router.push("/gauntlet")}>Start</Button>
      </CardContent>
    </Card>
  );
}
