'use client'

import { Github, Twitter, Linkedin, Instagram, Facebook, LinkIcon, DollarSign } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Project, Social } from "@/types/page-types";
import Image from "next/image";

type PreviewProps = {
    name: string;
    bio: string;
    socials: Social[];
    projects: Project[];
    isDesktopPreview: boolean;
    isProjectDialogOpen: boolean;
    isSocialDialogOpen: boolean;
    setIsProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSocialDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDesktopPreview: React.Dispatch<React.SetStateAction<boolean>>;
    avatar?: string;
}

const socialIcons = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
}

const Preview = ({ name, bio, projects, socials, isDesktopPreview, setIsDesktopPreview, avatar }: PreviewProps) => {
    return (
        <div className="w-full lg:w-1/2 p-4 overflow-auto text-black dark:text-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Preview</h2>
                <div className="hidden md:flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-white">Mobile</span>
                        <Switch
                            checked={isDesktopPreview}
                            onCheckedChange={setIsDesktopPreview}
                        />
                    <span className="text-sm text-gray-600 dark:text-white">Desktop</span>
                </div>
            </div>
            <div className="flex justify-center ">
                <div 
                    className={`bg-white dark:bg-neutral-900 text-black dark:text-white rounded-xl border overflow-hidden transition-all duration-300 ${isDesktopPreview ? 'w-[1024px]' : 'w-[375px]'}`}
                >
                    <div className="p-8">
                        <div className="text-center mb-8">
                            {avatar && (
                                <div className="mb-4 flex justify-center">
                                    <Image 
                                        src={avatar} 
                                        alt={name} 
                                        width={100} 
                                        height={100}
                                        className="rounded-full"
                                    />
                                </div>
                            )}
                            <h1 className="text-2xl font-bold mb-2">{name}</h1>
                            <p className="text-gray-600 dark:text-gray-400">{bio}</p>
                        </div>

                        {/* Socials */}
                        {socials.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">Connect with me</h2>
                                <div className="flex flex-wrap gap-4">
                                    {socials.map((social, index) => {
                                        const Icon = socialIcons[social.type.toLowerCase() as keyof typeof socialIcons]
                                        return (
                                            <a
                                                key={index}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                                            >
                                                {Icon && <Icon className="w-5 h-5" />}
                                                <span>{social.type}</span>
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {projects.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">My Projects</h2>
                                <div className="space-y-4">
                                    {projects.map((project, index) => (
                                        <a
                                            key={index}
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-4 rounded-lg border hover:border-gray-400 dark:hover:border-gray-600"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium">{project.name}</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        {project.oneLiner}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {project.mrr && (
                                                        <>
                                                            <DollarSign className="w-4 h-4" />
                                                            <span>{project.mrr}/mo</span>
                                                        </>
                                                    )}
                                                    <LinkIcon className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Preview