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
import { useState } from "react"

const themes = [
    {
        id: 'light',
        name: 'Light',
        colors: ["hsl(0, 0%, 92%)", "rebeccapurple"],
    },
    {
        id: 'dark',
        name: 'Dark',
        colors: ["hsl(0, 0%, 22%)", "hsl(225,92%,77%)"],
    },
] as const

interface ThemeSelectorProps {
    value: string
    onChange: (value: string) => void
}

const GithubSelect = () => {
  const [theme, setTheme] = useState('light')

  return (
    <div>
        <Label htmlFor="theme" className="mb-2">Color Theme</Label>
        <ThemeSelector value={theme} onChange={setTheme} />
    </div>
  )
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                >
                    {themes.find((theme) => theme.id === value)?.name || "Select theme"}
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
                                value === theme.id && "bg-accent"
                            )}
                            onClick={() => onChange(theme.id)}
                        >
                            <div className="flex items-center gap-2">
                                {theme.name}
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ background: theme.colors[1] }}
                                />
                            </div>
                            {value === theme.id && (
                                <Check className="h-4 w-4" />
                            )}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default GithubSelect