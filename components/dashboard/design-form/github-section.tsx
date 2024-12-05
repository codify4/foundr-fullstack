'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ThemeSelector from "./github-select"
import { getPageIdForUser, upsertGithubCalendar } from "@/actions/page-actions";
import { useState } from "react";
import { InsertGithubCalendar } from "@/db/schemas/page-schema";

type GithubSectionProps = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    theme: string | undefined;
    setTheme: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const GithubSection = ({ username, setUsername, theme, setTheme }: GithubSectionProps) => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleGithubCalendar = async (formData: FormData) => {
        setIsSubmitting(true)
        try {
            const pageId = await getPageIdForUser();
            
            if (!pageId) {
                throw new Error('User page not found')
            }

            const githubData = {
                username: formData.get('username') as string,
                theme: theme || 'github'
            }

            const githubCalendar = await upsertGithubCalendar(pageId, githubData);
            setUsername(githubCalendar.username);
            setTheme(githubCalendar.theme);
            
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitting(false);
        }
    }
    
    return ( 
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Github Activity</h3>
                <p className="text-sm text-muted-foreground">Add your Github contributions graph here.</p>
            </div>
            <form 
                className="flex flex-col gap-3"
                action={handleGithubCalendar}
            >
                <div>
                    <Label htmlFor="username" className="mb-2">Github Username</Label>
                    <Input id="username" name="username" type="text" placeholder="Enter your github username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <Label htmlFor="theme" className="mb-2">Color Theme</Label>
                    <ThemeSelector value={theme} setValue={setTheme} />
                </div>
                <Button 
                    type="submit" 
                    className="w-full bg-black hover:bg-secondary text-white"
                >
                    {isSubmitting ? 'Saving...' : 'Save'}
                </Button>                    
            </form>
        </div>
    );
}

export default GithubSection