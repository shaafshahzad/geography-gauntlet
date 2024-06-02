"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/navigation";
import { globeConfig, sampleArcs } from "~/lib/Globe";
import dynamic from "next/dynamic";

const World = dynamic(
  () => import("~/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  },
);

export function Gauntlet() {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-row gap-5">
      <Card className="flex h-full w-1/2 flex-col gap-4 p-5">
        <CardTitle>Gauntlet</CardTitle>
        <CardContent className="flex h-full w-full flex-col justify-between gap-11 pb-0">
          <p>something something idk</p>
          <Button onClick={() => router.push("/gauntlet")}>
            Start Gauntlet
          </Button>
        </CardContent>
      </Card>
      <div className="flex w-1/2 flex-col items-center justify-center">
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
}
