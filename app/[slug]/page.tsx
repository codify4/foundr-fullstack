'use client'

import { Project, Social } from "@/types/page-types";
import { useState } from "react";
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram, Facebook, LinkIcon, DollarSign } from "lucide-react"

const socialIcons = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
}

export default function SlugPage({ params }: { params: { slug: string } }) {
    const [name, setName] = useState('Mr. Founder')
    const [avatarUrl, setAvatarUrl] = useState('/favicon.ico')
    const [bio, setBio] = useState('10x software engineer, 10x designer, 10x developer')
    const [projects, setProjects] = useState<Project[]>([])
    const [socials, setSocials] = useState<Social[]>([])
    
    return (
        <div className="flex justify-center">
            <div 
                className={`bg-white dark:bg-neutral-900 text-black dark:text-white rounded-xl overflow-hidden transition-all duration-300`}
            >
                <div className="p-8">
                    <Image
                        src={avatarUrl}
                        alt="Avatar"
                        width={130}
                        height={130}
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold text-center mb-2">{name}</h1>
                    <p className="text-center text-gray-700 dark:text-white whitespace-pre-wrap mb-4">{bio}</p>
                    <div className="flex justify-center items-center space-x-4 mb-8">
                        {socials.map((social, index) => {
                            const IconComponent = socialIcons[social.platform as keyof typeof socialIcons]
                            return (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <IconComponent className="w-6 h-6" />
                                </a>
                            )
                        })}
                    </div>
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Projects</h2>
                        </div>
                        <ul className="space-y-6">
                            {projects.map((project, index) => (
                                <li key={index} className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-700 mb-3">{project.description}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <a 
                                            href={project.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-blue-500 hover:text-blue-700 flex items-center"
                                        >
                                            <LinkIcon className="h-4 w-4 mr-1" />
                                            View Project
                                        </a>
                                        <div className="flex items-center text-green-600">
                                            <DollarSign className="h-4 w-4 mr-1" />
                                            <span>{project.revenue.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}