import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {ticketsPath, homePath} from "@/paths";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Road Next",
  description: "My Road to Next application",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <nav className="flex justify-between py-2.5 boarder-b">
      <div>
        <Link href={homePath()} className="text-lg font-bold">Home</Link>
      </div>
      <div>
        <Link href={ticketsPath()} className="text-sm underline">Tickets</Link>
      </div>
    </nav>
    <main className="py-24 px-8">
      {children}
    </main>
    </body>
    </html>
  );
}
