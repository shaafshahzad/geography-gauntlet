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
        className="relative flex cursor-pointer items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute left-0 mt-1 transform ${isHovered ? "translate-x-0 opacity-100 transition-all duration-300" : "translate-x-[-100%] opacity-0 transition-all duration-300"}`}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <p
          className={`relative flex select-none items-center justify-center text-lg font-bold italic sm:text-3xl ${isHovered ? "translate-x-6 transition-all duration-300" : "transition-all duration-300"}`}
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
