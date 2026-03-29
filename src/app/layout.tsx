import "./globals.css";

import {Header} from "@/app/_navigation/Header";
import {ThemeProvider} from "@/theme/theme-provider";
import {Toaster} from "sonner";
import {RedirectToast} from "@/components/redirect-toast";
import {Metadata} from "next";
import localFont from "next/font/local";
import {Sidebar} from "@/app/_navigation/sidebar/components/sidebar";
import {NuqsAdapter} from "nuqs/adapters/next/app";


const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--fonts-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--fonts-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "The Road to Next",
    description: "My Road to Next application ...",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NuqsAdapter>
            <ThemeProvider>
                <Header/>
                <div className="flex h-screen overflow-hidden border-collapse">
                    <Sidebar/>
                    <main className="
                min-h-screen flex-1
                overflow-y-auto overflow-x-hidden
                py-24 px-8
                bg-secondary/20
                flex flex-col">
                        {children}
                    </main>
                </div>
                <Toaster expand/>
                <RedirectToast/>
            </ThemeProvider>
        </NuqsAdapter>
        </body>
        </html>
    );
}
