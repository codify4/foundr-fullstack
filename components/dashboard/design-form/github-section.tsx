import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  


const GithubSection = () => {
    return ( 
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mt-4 w-full bg-black hover:bg-secondary rounded-lg text-white">
                        Add Commits Graph
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Commits Graph</DialogTitle>
                    </DialogHeader>

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
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default GithubSection