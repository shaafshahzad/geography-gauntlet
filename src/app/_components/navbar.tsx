"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { useState } from "react";

export function Navbar() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex w-full justify-between p-3">
      <div
        className="relative flex cursor-pointer items-center gap-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute left-0 mt-0.5 transform ${isHovered ? "translate-x-0 opacity-100 transition-all duration-300" : "-translate-x-full opacity-0 transition-all duration-300"}`}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-accent transition-all duration-300 ${isHovered ? "translate-x-6" : ""}`}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <p
          className={`font-heading select-none text-lg font-bold sm:text-2xl transition-all duration-300 ${isHovered ? "translate-x-6" : ""}`}
        >
          GeographyGauntlet
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <ModeToggle />
        <SignedOut>
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
