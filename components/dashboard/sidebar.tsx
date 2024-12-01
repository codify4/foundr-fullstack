'use client'

import { BarChart, Menu, Palette, Settings, Clipboard, ClipboardCheck, SearchCheck } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardDescription, CardHeader } from "../ui/card"
import { copyTextToClipboard } from "@/lib/copy-to-clipboard"
import { useState } from "react"
import Image from "next/image"

const Sidebar = ({ slug }: { slug?: string }) => {
    const pathname = usePathname();

    const [isCopied, setIsCopied] = useState(false);
    
    const handleCopyClick = () => {
        copyTextToClipboard(`https://www.foundr.vercel.app/${slug}`)
            .then(() => {
                setIsCopied(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <div className="hidden lg:flex w-64 py-3 bg-white dark:bg-neutral-900 text-black dark:text-white border-r z-10 text-sm">
                <nav className="flex flex-col items-start justify-between px-3 py-2 space-y-4 w-full">
                    <div className="flex flex-col px-2 w-full space-y-4">
                        <div className="flex flex-col w-full space-y-1">
                            <Link
                                className={`flex items-center text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                    pathname === '/dashboard'
                                    ? 'bg-gray-100 dark:bg-neutral-800 text-black dark:text-white font-medium shadow-sm'
                                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
                                }`}
                                href={`/dashboard`}
                            >   
                                <Palette className="inline-block w-4 h-4 mr-3" />
                                <span className="font-medium">Design</span>
                            </Link>
                            <Link
                                className={`flex items-center text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                    pathname === '/dashboard/analytics'
                                    ? 'bg-gray-100 dark:bg-neutral-800 text-black dark:text-white font-medium shadow-sm'
                                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
                                }`}
                                href={`/dashboard/analytics`}
                            >   
                                <BarChart className="inline-block w-4 h-4 mr-3" />
                                <span className="font-medium">Analytics</span>
                            </Link>
                            <Link
                                className={`flex items-center text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                    pathname === '/dashboard/settings'
                                    ? 'bg-gray-100 dark:bg-neutral-800 text-black dark:text-white font-medium shadow-sm'
                                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
                                }`}
                                href={`/dashboard/settings`}
                            >
                                <Settings className="inline-block w-4 h-4 mr-3" />
                                <span className="font-medium">Settings</span>
                            </Link>
                        </div>
                        <div>
                            <ThemeToggle />
                        </div>
                    </div>

                    <div className="w-full px-2">
                        <Card className="overflow-hidden border dark:border-neutral-800 bg-white dark:bg-neutral-950 text-black dark:text-white rounded-xl">
                            <div className="p-4 space-y-4">
                                <div className="space-y-1.5">
                                    <CardHeader className="font-semibold text-base p-0">Published Page</CardHeader>
                                    <CardDescription className="text-sm text-neutral-500 dark:text-neutral-400">Check out your published page!</CardDescription>
                                </div>
                                <div className="space-y-2">
                                    <Link
                                        href={`/${slug}`}
                                        className="w-full block"
                                        target="_blank"
                                    >
                                        <Button className="w-full bg-black dark:bg-primary hover:bg-secondary dark:hover:bg-secondary dark:hover:text-white text-white rounded-lg">
                                            <SearchCheck className="size-4 mr-2"/>
                                            View Page
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        onClick={handleCopyClick} 
                                        className="w-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white rounded-lg"
                                    >
                                        {isCopied ? (
                                            <span className="flex items-center gap-2">
                                                <ClipboardCheck size={14} />
                                                Copied!
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Clipboard size={14} />
                                                Copy Link
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </nav>
            </div>
            
            <div className="flex lg:hidden flex-row items-center justify-between">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" className="flex lg:hidden bg-white dark:bg-neutral-900 text-black dark:text-white border hover:bg-gray-50 transition-colors">
                            <Menu className="size-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-white dark:bg-neutral-900 text-black dark:text-white p-4">
                        <nav className="py-4 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Image src="/foundr.png" width={28} height={28} alt="Foundr" className="rounded-lg" />
                                <span className="font-semibold text-lg">Foundr</span>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <Link
                                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                        pathname === '/dashboard'
                                        ? 'bg-gray-100 dark:bg-neutral-800 text-black dark:text-white font-medium shadow-sm'
                                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
                                    }`}
                                    href={`/dashboard`}
                                >   
                                    <Palette className="inline-block w-4 h-4 mr-3" />
                                    <span className="font-medium">Design</span>
                                </Link>
                                <Link
                                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                        pathname === '/dashboard/analytics'
                                        ? 'bg-gray-100 dark:bg-neutral-800 text-black dark:text-white font-medium shadow-sm'
                                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
                                    }`}
                                    href={`/dashboard/analytics`}
                                >   
                                    <BarChart className="inline-block w-4 h-4 mr-3" />
                                    <span className="font-medium">Analytics</span>
                                </Link>
                                <Link
                                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                        pathname === '/dashboard/settings'
                                        ? 'bg-gray-100 dark:bg-neutral-800 text-black dark:text-white font-medium shadow-sm'
                                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
                                    }`}
                                    href={`/dashboard/settings`}
                                >
                                    <Settings className="inline-block w-4 h-4 mr-3" />
                                    <span className="font-medium">Settings</span>
                                </Link>
                            </div>
                            <ThemeToggle />
                        </nav>
                    </SheetContent>
                </Sheet>

                <Link
                    href={`/${slug}`}
                    className="flex items-center justify-center"
                    target="_blank"
                >
                    <Button className="bg-black hover:opacity-90 transition-opacity">
                        <SearchCheck className="size-4 mr-2"/>
                        View Page
                    </Button>
                </Link>
            </div>
            
        </>
        
    )
}
export default Sidebar