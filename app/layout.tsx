import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import SyncProvider from "./components/SyncProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IELTS Masters — Practice smarter, score higher",
  description:
    "Realistic IELTS Reading, Listening, Writing and Speaking practice with instant feedback and band score tracking.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClerkProvider appearance={{ variables: { colorPrimary: "#eb0000", borderRadius: "0.75rem" } }}>
          <SyncProvider>{children}</SyncProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}