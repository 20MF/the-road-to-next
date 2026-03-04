import {Inter} from "next/font/google";
import "./globals.css";

import {Header} from "@/components/Header";

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={inter.className}
        >
        <Header/>
        <main className="min-h-screen flex-1 overflow-y-auto
                        overflow-x-hidden py-24 px-8
                        bg-secondary/20 flex flex-col">
            {children}
        </main>
        </body>
        </html>
    );
}
