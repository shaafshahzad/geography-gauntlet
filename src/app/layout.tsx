import "~/styles/globals.css";
import { Open_Sans } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./_components/navbar";
import { Toaster } from "~/components/ui/toaster";
import { CSPostHogProvider } from "./_analytics/provider";
import { Viewport } from "next";
import { Background } from "./_components/main/background";
import { ThemeProvider } from "~/components/ui/theme-provider";

export const dynamic = "force-dynamic";

const font = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "GeographyGauntlet",
  description:
    "Test your geography knowledge with Gauntlet, Country Quiz, and Flag Quiz games.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en" suppressHydrationWarning className="h-full">
          <body className={`font-sans ${font.variable}`}>
            <TRPCReactProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-background">
                  <Background>
                    <div className="min-h-screen w-full flex-col justify-center px-4 pb-5 md:max-w-6xl md:px-20">
                      <Navbar />
                      {children}
                    </div>
                  </Background>
                </main>
                <Toaster />
              </ThemeProvider>
            </TRPCReactProvider>
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
