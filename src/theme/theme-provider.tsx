import React from "react";
import {ThemeProvider as BaseThemeProvider} from "next-themes";


type ThemeProvider = {
    children: React.ReactNode
}
const ThemeProvider = ({children}: ThemeProvider) => {
    return (
        <BaseThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </BaseThemeProvider>)
}

export {ThemeProvider}