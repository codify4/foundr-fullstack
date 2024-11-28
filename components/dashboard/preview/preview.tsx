import { Github, Twitter, Linkedin, Instagram, Facebook, LinkIcon, DollarSign } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import { Project, Social } from "@/types/page-types";
import { SelectImage } from "@/db/schemas/page-schema";

type PreviewProps = {
    name: string;
    bio: string;
    avatarUrl: SelectImage['url'];
    socials: Social[];
    projects: Project[];
    isDesktopPreview: boolean;
    isProjectDialogOpen: boolean;
    isSocialDialogOpen: boolean;
    setIsProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSocialDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDesktopPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const socialIcons = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
}

const Preview = ({ name, avatarUrl, bio, projects, socials, isDesktopPreview, setIsDesktopPreview }: PreviewProps) => {
    return (
        <div className="w-full lg:w-1/2 p-8 overflow-auto text-black dark:text-white">
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
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <Image
                                src={avatarUrl || '/icon.png'}
                                alt={`${name}'s avatar`}
                                fill
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-center mb-2">{name}</h1>
                        <p className="text-center text-gray-700 dark:text-white whitespace-pre-wrap mb-4">{bio}</p>
                        <div className="flex justify-center items-center space-x-4 mb-8">
                            {socials?.map((social, index) => {
                                const IconComponent = socialIcons[social.type as keyof typeof socialIcons]
                                return (
                                    <a
                                        key={index}
                                        href={social.link}
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
                                {projects?.map((project, index) => (
                                    <li key={index} className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <h3 className="text-xl font-semibold mb-2">
                                            {project.name}
                                        </h3>
                                        <p className="text-gray-700 mb-3">{project.oneLiner}</p>
                                        <div className="flex items-center justify-between mt-4">
                                            <a 
                                                href={project.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-blue-500 hover:text-blue-700 flex items-center"
                                            >
                                                <LinkIcon className="h-4 w-4 mr-1" />
                                                View Project
                                            </a>
                                            <div className="flex items-center text-green-600">
                                                <DollarSign className="h-4 w-4 mr-1" />
                                                <span>{project.mrr}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Preview