import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./_components/navbar";
import { Toaster } from "~/components/ui/toaster";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "GeographyGauntlet",
  description:
    "Test your geography knowledge with Gauntlet, Country Quiz, and Flag Quiz games.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-sans ${inter.variable}`}>
          <TRPCReactProvider>
            <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-background">
              <div className="min-h-screen w-full max-w-6xl px-20 pb-5">
                <Navbar />
                {children}
              </div>
            </main>
            <Toaster />
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
