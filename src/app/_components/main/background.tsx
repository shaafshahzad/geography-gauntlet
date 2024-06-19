"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "~/components/ui/hero-highlight";

export function Background({ children }: { children: React.ReactNode }) {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="flex w-full items-center justify-center"
      >
        {children}
      </motion.h1>
    </HeroHighlight>
  );
}
