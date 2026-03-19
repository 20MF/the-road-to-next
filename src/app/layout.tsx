import {Inter, Geist } from "next/font/google";
import "./globals.css";

import {Header} from "@/components/Header";
import {ThemeProvider} from "@/theme/theme-provider";
import {Toaster} from "sonner";
import {RedirectToast} from "@/components/redirect-toast";
import Template from "@/app/template";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang="en" className={cn("font-sans", geist.variable)}>
        <body className={inter.className}>
        <ThemeProvider>
            <Header/>
            <main className="
                min-h-screen flex-1
                overflow-y-auto overflow-x-hidden
                py-24 px-8
                bg-secondary/20
                flex flex-col">
                {children}
            </main>
            <Toaster expand/>
            <RedirectToast/>
        </ThemeProvider>
        </body>
        </html>
    );
}
