'use client'

import { BarChart, Menu, Palette, Settings } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {
    const pathname = usePathname();
    
    return (
        <>
            <div className="hidden lg:flex w-64 py-3 bg-white dark:bg-neutral-900 text-black dark:text-white border-r z-10 text-sm">
                <nav className="flex flex-col items-start px-7 py-4 space-y-2">
                    <div className="flex flex-col">
                        <Link
                            className={`w-full flex items-center text-left text-md py-3 rounded-md transition-colors ${
                                pathname === '/dashboard'
                                ? 'bg-gray-50 dark:bg-neutral-800 text-black dark:text-white font-medium'
                                : 'text-neutral-500 dark:text-white w-full flex items-center text-left text-md py-3 rounded-md transition-colors'
                            }`}
                            href={`/dashboard`}
                        >   
                            <Palette className="inline-block w-5 h-5 mr-2" />
                            <span>Design</span>
                        </Link>
                        <Link
                            className={`w-full flex items-center text-left text-md py-3 rounded-md transition-colors ${
                                pathname === '/dashboard/analytics'
                                ? 'bg-gray-50 dark:bg-neutral-800 text-black dark:text-white font-medium'
                                : 'text-neutral-500 dark:text-white hover:text-black dark:hover:dark:hover:text-neutral-300'
                            }`}
                            href={`/dashboard/analytics`}
                        >   
                            <BarChart className="inline-block w-5 h-5 mr-2" />
                            <span>Analytics</span>
                        </Link>
                        <Link
                            className={`w-full flex items-center text-left text-md py-3 rounded-md transition-colors ${
                                pathname === '/dashboard/settings'
                                ? 'bg-gray-50 dark:bg-neutral-800 text-black dark:text-white font-medium'
                                : 'text-neutral-500 dark:text-white hover:text-black dark:hover:dark:hover:text-neutral-300'
                            }`}
                            href={`/dashboard/settings`}
                        >
                            <Settings className="inline-block w-5 h-5 mr-2" />
                            <span>Settings</span>
                        </Link>
                    </div>
                    <ThemeToggle />
                </nav>
            </div>

            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" className="flex lg:hidden bg-white dark:bg-neutral-900 text-black dark:text-white border hover:bg-gray-50">
                        <Menu className="size-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-white dark:bg-neutral-900 text-black dark:text-white">
                    <nav className="py-4 space-y-2">
                        <div className="flex flex-col">
                            <Link
                                className={`w-full text-left text-md px-4 py-3 rounded-md transition-colors cursor-pointer ${
                                    pathname === '/dashboard'
                                    ? 'bg-gray-50 dark:bg-neutral-800 text-black dark:text-white font-medium'
                                    : 'text-neutral-500 hover:text-black dark:hover:bg-neutral-800'
                                }`}
                                href={`/dashboard`}
                            >   
                                <Palette className="inline-block w-5 h-5 mr-2" />
                                Design
                            </Link>
                            <Link
                                className={`w-full text-left text-md px-4 py-3 rounded-md transition-colors ${
                                    pathname === '/dashboard/analytics'
                                    ? 'bg-gray-50 dark:bg-neutral-800 text-black dark:text-white font-medium'
                                    : 'text-neutral-500 hover:text-black dark:hover:bg-neutral-800'
                                }`}
                                href={`/dashboard/analytics`}
                            >   
                                <BarChart className="inline-block w-5 h-5 mr-2" />
                                Analytics
                            </Link>
                            <Link
                                className={`w-full text-left text-md px-4 py-3 rounded-md transition-colors ${
                                    pathname === '/dashboard/settings'
                                    ? 'bg-gray-50 dark:bg-neutral-800 text-black dark:text-white font-medium'
                                    : 'text-neutral-500 hover:text-black dark:hover:bg-neutral-800'
                                }`}
                                href={`/dashboard/settings`}
                            >
                                <Settings className="inline-block w-5 h-5 mr-2" />
                                Settings
                            </Link>
                        </div>
                        <ThemeToggle />
                    </nav>
                </SheetContent>
            </Sheet>
        </>
        
    )
}
export default Sidebar