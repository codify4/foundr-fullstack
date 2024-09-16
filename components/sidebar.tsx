'use client'

import { BarChart, Palette, Settings } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useState } from "react"

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('Design')
    return (
        <div className="hidden lg:flex w-64 py-3 bg-white dark:bg-neutral-900 text-black dark:text-white border z-10 text-sm">
            <nav className="p-4 space-y-2">
                <div>
                    {['Design', 'Settings', 'Analytics'].map((item) => (
                        <button
                            key={item}
                            className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                                activeTab === item
                                ? 'bg-gray-100 dark:bg-neutral-800 text-black dark:text-white font-medium'
                                : 'text-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-800'
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
    )
}
export default Sidebar