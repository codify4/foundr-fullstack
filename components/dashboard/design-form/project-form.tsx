import { Label } from "@radix-ui/react-label"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { X } from "lucide-react"
import { getProjectsByPageId } from "@/actions/project-actions"

const ProjectForm = async ({ pageId }: { pageId: number }) => {
    const projects = await getProjectsByPageId(pageId)
    return (
        <div>
            <Label htmlFor="projects" className="text-sm font-medium mr-5">Projects</Label>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mt-1 bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-white">Add Project</Button>
                </DialogTrigger>
                <DialogContent className='w-11/12 rounded-lg bg-white dark:bg-neutral-900 text-black dark:text-white'>
                    <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="projectName" className="text-sm font-medium">Project Name</Label>
                            <Input
                                autoComplete="off"
                                id="projectName"
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="projectLink" className="text-sm font-medium">Project Link</Label>
                            <Input
                                autoComplete="off"
                                id="projectLink"
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="projectDescription" className="text-sm font-medium">Project Description</Label>
                            <Textarea
                                autoComplete="off"
                                id="projectDescription"
                                className="mt-1"
                                rows={3}
                            />
                        </div>
                        <div>
                            <Label htmlFor="projectRevenue" className="text-sm font-medium">Total Revenue</Label>
                            <Input
                                autoComplete="off"
                                id="projectRevenue"
                                type="number"
                                className="mt-1"
                            />
                        </div>
                        <Button className="bg-primary hover:bg-secondary text-white">Add Project</Button>
                    </div>
                </DialogContent>
            </Dialog>
            <ul className="mt-2 space-y-2">
                {projects.map((project, index) => (
                    <li key={index} className="flex items-center justify-between bg-white dark:bg-neutral-800 text-black dark:text-white p-2 rounded">
                        <span>{project.name}</span>
                        <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ProjectForm