import type {Metadata} from "next";
import {Inter} from "next/font/google";
import NavBar from "./_components/NavBar";
import "./globals.css";
import QueryClientProvider from "./_providers/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track, assign, and manage issues across your team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider>
          <NavBar />
          <main>
            <div className="container mx-auto px-5">{children}</div>
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
