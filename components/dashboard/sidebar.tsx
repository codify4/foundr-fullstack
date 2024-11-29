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
                <nav className="flex flex-col items-start justify-between px-3 py-4 space-y-2">
                    <div className="flex flex-col px-2 w-full">
                        <div className="flex flex-col w-full mb-1">
                            <Link
                                className={`flex items-center text-left text-md px-1 py-3 rounded-md transition-colors ${
                                    pathname === '/dashboard'
                                    ? 'bg-gray-50 dark:bg-neutral-900 text-black dark:text-white font-medium'
                                    : 'text-neutral-500 dark:text-white w-full flex items-center text-left text-md py-3 rounded-md transition-colors'
                                }`}
                                href={`/dashboard`}
                            >   
                                <Palette className="inline-block w-5 h-5 mr-2" />
                                <span>Design</span>
                            </Link>
                            <Link
                                className={`flex items-center text-left text-md px-1 py-3 rounded-md transition-colors ${
                                    pathname === '/dashboard/analytics'
                                    ? 'bg-gray-50 dark:bg-neutral-900 text-black dark:text-white font-medium'
                                    : 'text-neutral-500 dark:text-white hover:text-black dark:hover:dark:hover:text-neutral-300'
                                }`}
                                href={`/dashboard/analytics`}
                            >   
                                <BarChart className="inline-block w-5 h-5 mr-2" />
                                <span>Analytics</span>
                            </Link>
                            <Link
                                className={`flex items-center text-left text-md px-1 py-3 rounded-md transition-colors ${
                                    pathname === '/dashboard/settings'
                                    ? 'bg-gray-50 dark:bg-neutral-900 text-black dark:text-white font-medium'
                                    : 'text-neutral-500 dark:text-white hover:text-black dark:hover:dark:hover:text-neutral-300'
                                }`}
                                href={`/dashboard/settings`}
                            >
                                <Settings className="inline-block w-5 h-5 mr-2" />
                                <span>Settings</span>
                            </Link>
                        </div>
                        <ThemeToggle />
                    </div>

                    <div>
                        <Card className="flex flex-col items-center justify-center gap-2 w-full bg-white dark:bg-neutral-950 text-black dark:text-white py-4 px-2 rounded-lg border-0">
                            <div className="flex flex-col items-start justify-center px-3">
                                <CardHeader className="font-bold text-base p-0">Published Page</CardHeader>
                                <CardDescription>Check out the page you just created!</CardDescription>
                            </div>
                            <Link
                                href={`/${slug}`}
                                className="w-full flex items-center justify-center"
                                target="_blank"
                            >
                                <Button className="w-11/12 bg-black dark:bg-primary dark:hover:bg-secondary dark:text-white rounded-lg hover:bg-primary">
                                    <SearchCheck className="size-5 mr-1"/>
                                    Check out
                                </Button>
                            </Link>
                            <Button onClick={handleCopyClick} className="w-11/12 bg-black dark:bg-primary dark:hover:bg-secondary dark:text-white rounded-lg hover:bg-primary">
                                {isCopied ? (
                                    <span className="flex flex-row items-center gap-1">
                                        <ClipboardCheck size={16} />
                                        Copied
                                    </span>
                                ) : (
                                    <span className="flex flex-row items-center gap-1">
                                        <Clipboard size={16} />
                                        Copy Link
                                    </span>
                                )}
                            </Button>
                        </Card>
                    </div>
                </nav>
            </div>
            
            <div className="flex lg:hidden flex-row items-center justify-between">
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

                <Link
                    href={`/${slug}`}
                    className="flex items-center justify-center "
                    target="_blank"
                >
                    <Button className="bg-black hover:bg-primary">
                        <SearchCheck className="size-5 mr-1"/>
                        Check out
                    </Button>
                </Link>
            </div>
        </>
        
    )
}
export default Sidebar