import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ThemeSelector } from "./github-select"

type GithubSectionProps = {
    username: string;
    theme: string;
};

const GithubSection = () => {
    const [theme, setTheme] = useState('light')

    return ( 
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Github Activity</h3>
                <p className="text-sm text-muted-foreground">Add your Github contributions graph here.</p>
            </div>
            <form className="flex flex-col gap-3">
                <div>
                    <Label htmlFor="username" className="mb-2">Github Username</Label>
                    <Input id="username" name="username" type="text" placeholder="Enter your github username" />
                </div>
                <div>
                    <Label htmlFor="theme" className="mb-2">Color Theme</Label>
                    <ThemeSelector value={theme} onChange={setTheme} />
                </div>
                <Button 
                    type="submit" 
                    className="w-full bg-black hover:bg-secondary text-white"
                >
                    Add Graph
                </Button>                    
            </form>
        </div>
    );
}

export default GithubSection