import { SelectSocial } from "@/db/schemas/page-schema"
import DeleteSocial from "./delete-social"
import { Github, Twitter, Linkedin, Instagram, Facebook, ExternalLink } from "lucide-react"
import Link from "next/link"

const SocialIcons: Record<string, React.ComponentType<any>> = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
}

const SocialsList = ({ socials }: { socials: SelectSocial[] }) => {
    if (!socials?.length) {
        return (
            <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed">
                <p className="text-muted-foreground">No social links added yet</p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {socials?.map((social) => {
                const Icon = SocialIcons[social.type] || ExternalLink
                return (
                    <div 
                        key={social.link} 
                        className="group bg-card hover:bg-muted/50 border shadow-sm rounded-lg p-4 transition-colors"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-muted rounded-md">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <div className="font-medium capitalize">
                                        {social.type}
                                    </div>
                                    <Link 
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                                    >
                                        View Profile
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                            <div className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <DeleteSocial id={social.id} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SocialsList