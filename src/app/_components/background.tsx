"use client";
import useMouseMove from "~/lib/hooks/use-mouse-move";
import type { ReactNode } from "react";

export default function Background({ children }: { children: ReactNode }) {
  useMouseMove();
  return (
    <>
      <div className="fixed left-0 top-0 -z-50">
        <div className="sticky left-0 top-0 h-screen w-screen overflow-hidden">
          <div className="absolute inset-0 z-[-1] bg-muted/60" />
          <div className="bg-gradient-radial absolute left-[--x] top-[--y] z-[-1] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full from-accent/25 from-0% to-transparent to-90% blur-xl" />
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern
                id="dotted-pattern"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.2" fill="hsl(var(--foreground))" fillOpacity="0.12" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="hsl(var(--background))"
            />
            <rect
              width="100%"
              height="100%"
              fill="url(#dotted-pattern)"
            />
          </svg>
        </div>
      </div>

      {children}
    </>
  );
}
