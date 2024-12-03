import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  
const themes = [
    {
        light: ["hsl(0, 0%, 92%)", "rebeccapurple"],
        dark: ["hsl(0, 0%, 22%)", "hsl(225,92%,77%)"],
    },
    {
        light: ["hsl(240, 100%, 95%)", "hsl(340, 100%, 50%)"],
        dark: ["hsl(240, 100%, 15%)", "hsl(340, 100%, 40%)"],
    },
] as const;
  

type ThemeKeys = keyof typeof themes[number];

type GithubSectionProps = {
    username: string;
    theme: ThemeKeys;
};

const GithubSection = () => {
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
                    <Select name="theme" defaultValue="light">
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
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