"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  return (
    <div className="flex w-full justify-between rounded-b-md border border-t-0 bg-card p-3">
      <p
        onClick={() => router.push("/")}
        className="flex cursor-pointer items-center justify-center text-lg font-bold italic sm:text-3xl"
      >
        GeographyGauntlet
      </p>

      <SignedOut>
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
