'use client'

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeInput } from "@/types/theme-type"
import { themes } from "@/constants/themes"



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