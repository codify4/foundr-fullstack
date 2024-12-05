'use client'

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeInput } from "@/types/theme-type"

export const themes = [
    {
        id: 'github',
        name: 'GitHub',
        colors: ["#ebedf0", "#40c463"],
        value: {
            light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
            dark: undefined
        } satisfies ThemeInput
    },
    {
        id: 'purple',
        name: 'Purple',
        colors: ["#f5f3ff", "#7c3aed"],
        value: {
            light: ["#f5f3ff", "#ddd6fe", "#a78bfa", "#7c3aed", "#5b21b6"],
            dark: undefined
        } satisfies ThemeInput
    },
    {
        id: 'crimson',
        name: 'Crimson',
        colors: ["#fef2f2", "#dc2626"],
        value: {
            light: ["#fef2f2", "#fecaca", "#f87171", "#dc2626", "#991b1b"],
            dark: undefined
        } satisfies ThemeInput
    },
    {
        id: 'ocean',
        name: 'Ocean',
        colors: ["hsl(200, 65%, 95%)", "hsl(200, 85%, 45%)"],
        value: {
            light: ["hsl(200, 65%, 95%)", "hsl(200, 75%, 65%)", "hsl(200, 85%, 45%)", "hsl(200, 85%, 35%)", "hsl(200, 85%, 25%)"],
            dark: undefined
        } satisfies ThemeInput
    },
    {
        id: 'sunset',
        name: 'Sunset',
        colors: ["hsl(40, 80%, 97%)", "hsl(20, 90%, 60%)"],
        value: {
            light: ["hsl(40, 80%, 97%)", "hsl(20, 90%, 60%)"],
            dark: undefined
        } satisfies ThemeInput
    },
    {
        id: 'forest',
        name: 'Forest',
        colors: ["hsl(120, 20%, 95%)", "hsl(150, 60%, 40%)"],
        value: {
            light: ["hsl(120, 20%, 95%)", "hsl(150, 60%, 40%)"],
            dark: undefined
        } satisfies ThemeInput
    },
    {
        id: 'lavender',
        name: 'Lavender',
        colors: ["hsl(280, 20%, 95%)", "hsl(280, 60%, 65%)"],
        value: {
            light: ["hsl(280, 20%, 95%)", "hsl(280, 60%, 65%)"],
            dark: undefined
        } satisfies ThemeInput
    }
] as const

interface ThemeSelectorProps {
    value: ThemeInput | undefined
    setValue: React.Dispatch<React.SetStateAction<ThemeInput | undefined>>
}

export default function ThemeSelector({ value, setValue }: ThemeSelectorProps) {
    const getCurrentThemeId = () => {
        if (!value) return 'github'
        return themes.find(theme => 
            JSON.stringify(theme.value) === JSON.stringify(value)
        )?.id || 'github'
    }

    const currentTheme = themes.find((theme) => theme.id === getCurrentThemeId()) || themes[0]

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                >
                    {currentTheme.name}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="p-0 w-[var(--radix-popover-trigger-width)] -ml-[1px]" 
                align="start"
                sideOffset={4}
            >
                <div className="grid gap-1 p-1">
                    {themes.map((theme) => (
                        <Button
                            key={theme.id}
                            variant="ghost"
                            role="option"
                            className={cn(
                                "justify-between",
                                getCurrentThemeId() === theme.id && "bg-accent"
                            )}
                            onClick={() => setValue(theme.value)}
                        >
                            <div className="flex items-center gap-2">
                                {theme.name}
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ background: theme.colors[1] }}
                                />
                            </div>
                            {getCurrentThemeId() === theme.id && (
                                <Check className="h-4 w-4" />
                            )}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}