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

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('Design')
    return (
        <>
            <div className="hidden lg:flex w-64 py-3 bg-white dark:bg-neutral-900 text-black dark:text-white border-r z-10 text-sm">
                <nav className="p-4 space-y-2">
                    <div>
                        {['Design', 'Settings', 'Analytics'].map((item) => (
                            <button
                                key={item}
                                className={`w-full text-left text-md px-4 py-3 rounded-md transition-colors ${
                                    activeTab === item
                                    ? 'bg-gray-50 dark:bg-neutral-800 text-black dark:text-white font-medium'
                                    : 'text-neutral-500 hover:text-black dark:hover:bg-neutral-800'
                                }`}
                                onClick={() => setActiveTab(item)}
                            >
                                {item === 'Design' && <Palette className="inline-block w-5 h-5 mr-2" />}
                                {item === 'Settings' && <Settings className="inline-block w-5 h-5 mr-2" />}
                                {item === 'Analytics' && <BarChart className="inline-block w-5 h-5 mr-2" />}
                                {item}
                            </button>
                        ))}
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
                        <div>
                            {['Design', 'Settings', 'Analytics'].map((item) => (
                                <button
                                    key={item}
                                    className={`w-full text-left text-md px-4 py-3 rounded-md transition-colors ${
                                        activeTab === item
                                        ? 'bg-gray-50 dark:bg-neutral-800 text-black dark:text-white font-medium'
                                        : 'text-neutral-500 hover:text-black dark:hover:bg-neutral-800'
                                    }`}
                                    onClick={() => setActiveTab(item)}
                                >
                                    {item === 'Design' && <Palette className="inline-block w-5 h-5 mr-2" />}
                                    {item === 'Settings' && <Settings className="inline-block w-5 h-5 mr-2" />}
                                    {item === 'Analytics' && <BarChart className="inline-block w-5 h-5 mr-2" />}
                                    {item}
                                </button>
                            ))}
                        </div>
                        <ThemeToggle />
                    </nav>
                </SheetContent>
            </Sheet>
        </>
        
    )
}
export default Sidebar