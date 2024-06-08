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
    <div className="flex h-full w-full flex-row lg:gap-5">
      <Card className="flex h-full w-full flex-col gap-4 p-5 lg:w-1/2">
        <CardTitle>Gauntlet</CardTitle>
        <CardContent className="flex h-full w-full flex-col justify-between gap-4 px-1 pb-0 sm:px-6">
          <p className="text-2xl font-medium italic">
            Test your geography knowledge under pressure!
          </p>
          <div className="flex flex-grow flex-col items-center justify-end gap-4 md:flex-row">
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
          </div>
          <Button className="w-full" onClick={() => router.push("/gauntlet")}>
            Start Gauntlet
          </Button>
        </CardContent>
      </Card>
      <div className="invisible flex h-full w-0 flex-col items-center justify-center lg:visible lg:w-1/2">
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
}
