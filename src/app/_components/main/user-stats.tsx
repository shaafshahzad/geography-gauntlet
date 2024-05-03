import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

export function UserStats() {
  return (
    <Card>
      <CardTitle>User Stats</CardTitle>
      <CardContent>
        <SignedOut>
          <p>Sign in to view your stats or sign up to track them</p>
        </SignedOut>
        <SignedIn>
          <p>Here are your stats:</p>
          <p>Games played: 0</p>
          <p>Games won: 0</p>
          <p>Games lost: 0</p>
          <p>Win rate: 0%</p>
        </SignedIn>
      </CardContent>
    </Card>
  );
}
