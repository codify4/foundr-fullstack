"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="dark:bg-neutral-900 text-neutral-600 dark:text-white gap-2 w-full">
                    <span>Toggle theme</span>
                    <Moon className="size-5 hidden dark:block" />
                    <Sun className="size-5 block dark:hidden" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-10 bg-white dark:bg-neutral-900 text-black dark:text-white">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
