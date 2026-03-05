import {Inter} from "next/font/google";
import "./globals.css";

import {Header} from "@/components/Header";
import {ThemeProvider} from "@/theme/theme-provider";

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressContentEditableWarning lang="en">
        <body
            className={inter.className}
        >
        <ThemeProvider>
            <Header/>
            <main className="min-h-screen flex-1 overflow-y-auto
                        overflow-x-hidden py-24 px-8
                        bg-secondary/20 flex flex-col">
                {children}
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}
