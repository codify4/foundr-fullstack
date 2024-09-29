import { updateProject } from "@/actions/project-actions";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { redirect } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InsertProject } from "@/db/schemas/page-schema";
  

const DeleteProject = ({ id }: { id: number }) => {

    const handleEditProject = async (formData: FormData) => {
        const projectData: Omit<InsertProject, 'id' | 'createdAt' | 'updatedAt' | 'pageId'> = {
            name: formData.get('name') as string,
            url: formData.get('url') as string,
            oneLiner: formData.get('oneLiner') as string,
            mrr: formData.get('mrr') as string,
        }

        await updateProject(id, projectData);
        redirect('/dashboard')
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size="icon" className="text-white rounded-lg hover:bg-secondary">
                    <Pen size={20}/>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 md:w-full rounded-xl">
                <DialogHeader className="text-left">
                    <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>

                <form 
                    className="flex flex-col gap-4"
                    action={handleEditProject}
                >
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium">Project Name</Label>
                        <Input
                            id="name"
                            name="name"
                            className="mt-1"
                            autoComplete='off'
                        />
                    </div>
                    <div>
                        <Label htmlFor="url" className="text-sm font-medium">Project Url</Label>
                        <Input
                            id="url"
                            name="url"
                            className="mt-1"
                            autoComplete='off'
                        />
                    </div>
                    <div>
                        <Label htmlFor="oneLiner" className="text-sm font-medium">Project One Liner</Label>
                        <Textarea
                            id="oneLiner"
                            name="oneLiner"
                            className="mt-1"
                            rows={3}
                            autoComplete='off'
                        />
                    </div>
                    <div>
                        <Label htmlFor="mrr" className="text-sm font-medium">Total MRR</Label>
                        <Input
                            id="mrr"
                            name="mrr"
                            type="number"
                            className="mt-1"
                            autoComplete='off'
                        />
                    </div>                
                    <Button 
                        type="submit"
                        variant="default"
                        className="w-full text-white rounded-lg hover:bg-secondary"
                    >
                        Save changes
                    </Button>
                </form>

            </DialogContent>
        </Dialog>
    
    )
}

export default DeleteProject