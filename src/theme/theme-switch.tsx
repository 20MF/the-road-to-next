"use client"

import {useTheme} from "next-themes";
import {LucideMoon, LucideSun} from "lucide-react";
import {Button} from "@/components/ui/button";

const ThemeSwitch = () => {
    const {theme, setTheme} = useTheme();

    return (
        <div>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {/*切换太阳和月亮图标, 注意rotate和scale变化*/}
                <LucideSun className="h-4 w-4 rotate-0 scale-100 transition-all
                                        dark: -rotate-90 dark:scale-0"/>
                <LucideMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all
                                       dark: rotate-0 dark:scale-100"/>
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    )
}
export {ThemeSwitch}