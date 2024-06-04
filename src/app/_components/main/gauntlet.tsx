"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
        <CardContent className="flex h-full w-full flex-col justify-between gap-4 pb-0">
          <p className="text-2xl font-medium italic">
            Test your geography knowledge under pressure!
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-md">
              In Gauntlet, you have <u>10 seconds</u> to answer each question
              correctly.
              <br />
              Score points by answering quickly, but beware – once time runs
              out, it&apos;s <b>game over</b>.
            </p>
            <Image
              src="/gauntlet-icon.png"
              width={150}
              height={150}
              alt="Gauntlet icon"
              className="align-middle"
            />
            <Button className="w-full" onClick={() => router.push("/gauntlet")}>
              Start Gauntlet
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex w-1/2 flex-col items-center justify-center">
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
}
