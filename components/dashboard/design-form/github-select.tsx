'use client'

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronDown } from "lucide-react"
import { themes } from "@/constants/themes"



interface ThemeSelectorProps {
    value: string | undefined
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function ThemeSelector({ value, setValue }: ThemeSelectorProps) {
    const currentTheme = themes.find((theme) => theme.id === value) || themes[0]

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                >
                    <div className="flex items-center gap-2">
                        {currentTheme.name}
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: currentTheme.colors[1] }}
                        />
                    </div>
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
                            className="flex w-full items-center justify-between"
                            onClick={() => setValue(theme.id)}
                        >
                            <div className="flex items-center gap-2">
                                {theme.name}
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ background: theme.colors[1] }}
                                />
                            </div>
                            {theme.id === value && (
                                <Check className="h-4 w-4" />
                            )}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}