'use client'

import { Github, Linkedin, Instagram, Facebook, LinkIcon, DollarSign } from "lucide-react"
import { BsTwitterX } from "react-icons/bs";
import { Project, Social } from "@/types/page-types";
import Image from "next/image";
import { Device, DeviceSwitch } from "./device-switch"
import { useState } from "react";
import Link from "next/link";
import GitHubCalendar from 'react-github-calendar';
import { cn } from "@/lib/utils";


type PreviewProps = {
    name: string;
    bio: string;
    socials: Social[];
    projects: Project[];
    isProjectDialogOpen: boolean;
    isSocialDialogOpen: boolean;
    setIsProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSocialDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    avatar?: string;
}

const socialIcons = {
    github: Github,
    twitter: BsTwitterX,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
}

const Preview = ({ name, bio, projects, socials, avatar }: PreviewProps) => {
    const [device, setDevice] = useState<Device>('desktop')

    const getPreviewWidth = () => {
        switch (device) {
            case 'mobile':
                return 'w-[375px]'
            case 'desktop':
                return 'w-10/12'
        }
    }

    return (
        <div className="w-full lg:w-1/2 py-4 lg:px-4 xl:px-0 overflow-auto text-black dark:text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Preview</h2>
                <div className="hidden md:block">
                    <DeviceSwitch device={device} setDevice={setDevice} />
                </div>
            </div>
            <div className="flex justify-center items-start">
                <div 
                    className={`bg-white dark:bg-neutral-900 text-black dark:text-white rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 ${getPreviewWidth()}`}
                >
                    <div className={cn("p-8", device === 'desktop' ? 'max-w-4xl mx-auto' : '')}>
                        <div className={cn("text-center mb-12", device === 'desktop' ? 'max-w-2xl mx-auto' : '')}>
                            {avatar && (
                                <div className="mb-6 flex justify-center">
                                    <div className="relative">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-800 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                        <Image 
                                            src={avatar} 
                                            alt={name} 
                                            width={device === 'desktop' ? 180 : 160} 
                                            height={device === 'desktop' ? 180 : 160}
                                            className="rounded-full relative ring-4 ring-white dark:ring-neutral-900"
                                        />
                                    </div>
                                </div>
                            )}
                            <h1 className={cn(
                                "font-bold mb-3 bg-gradient-to-r from-blue-400 to-blue-900 inline-block text-transparent bg-clip-text",
                                device === 'desktop' ? 'text-4xl' : 'text-3xl'
                            )}>{name}</h1>
                            <p className={cn(
                                "text-gray-600 dark:text-gray-400 max-w-2xl mx-auto",
                                device === 'desktop' ? 'text-xl' : 'text-lg'
                            )}>{bio}</p>
                        </div>

                        {/* Socials */}
                        {socials.length > 0 && (
                            <div className="mb-12">
                                <h2 className={cn(
                                    "font-bold mb-6 text-center",
                                    device === 'desktop' ? 'text-3xl' : 'text-2xl'
                                )}>Connect with me</h2>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {socials.map((social, index) => {
                                        const Icon = socialIcons[social.type.toLowerCase() as keyof typeof socialIcons]
                                        return (
                                            <Link
                                                key={index}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    "flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 border border-transparent hover:border-gray-200 dark:hover:border-neutral-700 transition-all duration-200 group",
                                                    device === 'desktop' ? 'text-lg' : 'text-base'
                                                )}
                                            >
                                                {Icon && <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />}
                                                <span className="font-medium">
                                                    {social.type.toLowerCase() === 'twitter' 
                                                        ? 'X (Twitter)'
                                                        : social.type.charAt(0).toUpperCase() + social.type.slice(1)
                                                    }
                                                </span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {projects.length > 0 && (
                            <div className="mb-12">
                                <h2 className={cn(
                                    "font-bold mb-6 text-center",
                                    device === 'desktop' ? 'text-3xl' : 'text-2xl'
                                )}>My Projects</h2>
                                <div className={cn(
                                    "space-y-4",
                                    device === 'desktop' ? 'max-w-3xl mx-auto' : ''
                                )}>
                                    {projects.map((project, index) => (
                                        <Link
                                            key={index}
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-6 rounded-xl border hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md bg-gray-50 dark:bg-neutral-800/50 group"
                                        >
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="flex-1">
                                                    <h3 className={cn(
                                                        "font-semibold text-blue-700 dark:text-blue-400 transition-colors duration-200",
                                                        device === 'desktop' ? 'text-2xl' : 'text-xl'
                                                    )}>{project.name}</h3>
                                                    <p className={cn(
                                                        "text-gray-600 dark:text-gray-400 mt-2 line-clamp-2",
                                                        device === 'desktop' ? 'text-lg' : 'text-base'
                                                    )}>
                                                        {project.oneLiner}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {project.mrr && (
                                                        <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full">
                                                            <DollarSign className="w-4 h-4" />
                                                            <span className="font-medium">{project.mrr}/mo</span>
                                                        </div>
                                                    )}
                                                    <LinkIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-10">
                            <h2 className={cn(
                                "font-bold mb-6 text-center",
                                device === 'desktop' ? 'text-3xl' : 'text-2xl'
                            )}>Github Activity</h2>
                            <div className={cn(
                                "p-6 rounded-xl border bg-gray-50 dark:bg-neutral-800/50",
                                device === 'desktop' ? 'max-w-3xl mx-auto' : ''
                            )}>
                                <div className="overflow-x-auto">
                                    <GitHubCalendar 
                                        username="codify4" 
                                        fontSize={device === 'desktop' ? 14 : 12}
                                        blockSize={device === 'desktop' ? 10 : 8}
                                        blockMargin={4}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview