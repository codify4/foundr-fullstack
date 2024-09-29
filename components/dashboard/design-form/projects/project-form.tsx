'use client'

import { useState } from 'react'
import { Label } from "@radix-ui/react-label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createProject } from "@/actions/project-actions"
import { InsertProject, SelectProject } from '@/db/schemas/page-schema'
import { getPageIdForUser } from '@/actions/page-actions'
import { Project } from '@/types/page-types'
import ProjectList from './project-list'

type ProjectFormProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    projects: SelectProject[];
    setProjects: React.Dispatch<React.SetStateAction<SelectProject[]>>;
    newProject: Project;
    setNewProject: React.Dispatch<React.SetStateAction<Project>>;
}

const ProjectForm = ({ open, setOpen, projects, setProjects, newProject, setNewProject }: ProjectFormProps) => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleCreateProject = async (formData: FormData) => {
        setIsSubmitting(true)
        try {
            const pageId = await getPageIdForUser();
            
            if (!pageId) {
                throw new Error('User page not found')
            }

            const projectData: Omit<InsertProject, 'id' | 'createdAt' | 'updatedAt'> = {
                name: formData.get('name') as string,
                url: formData.get('url') as string,
                oneLiner: formData.get('oneLiner') as string,
                mrr: formData.get('mrr') as string,
                pageId: pageId
            }

            const createdProject = await createProject(projectData);
            setProjects(prevProjects => [...(prevProjects || []), createdProject]);
            
            setIsSubmitting(false);
            setOpen(false);
            // Reset form fields
            setNewProject({ name: '', url: '', oneLiner: '', mrr: '' });
        } catch (error) {
            console.error('Error creating project:', error);
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <Label htmlFor="projects" className="text-sm font-medium mr-5">Projects</Label>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="mt-1 bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-white">Add Project</Button>
                </DialogTrigger>
                <DialogContent className='w-11/12 rounded-lg bg-white dark:bg-neutral-900 text-black dark:text-white'>
                    <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                    </DialogHeader>
                    <form 
                        className="space-y-4"
                        action={handleCreateProject}
                    >
                        <div>
                            <Label htmlFor="name" className="text-sm font-medium">Project Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={newProject.name}
                                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                                className="mt-1"
                                required
                                autoComplete='off'
                            />
                        </div>
                        <div>
                            <Label htmlFor="url" className="text-sm font-medium">Project Url</Label>
                            <Input
                                id="url"
                                name="url"
                                value={newProject.url}
                                onChange={(e) => setNewProject({...newProject, url: e.target.value})}
                                className="mt-1"
                                required
                                autoComplete='off'
                            />
                        </div>
                        <div>
                            <Label htmlFor="oneLiner" className="text-sm font-medium">Project One Liner</Label>
                            <Textarea
                                id="oneLiner"
                                name="oneLiner"
                                value={newProject.oneLiner}
                                onChange={(e) => setNewProject({...newProject, oneLiner: e.target.value})}
                                className="mt-1"
                                rows={3}
                                required
                                autoComplete='off'
                            />
                        </div>
                        <div>
                            <Label htmlFor="mrr" className="text-sm font-medium">Total MRR</Label>
                            <Input
                                id="mrr"
                                name="mrr"
                                type="number"
                                value={newProject.mrr}
                                onChange={(e) => setNewProject({...newProject, mrr: e.target.value})}
                                className="mt-1"
                                required
                                autoComplete='off'
                            />
                        </div>
                        <Button 
                            type="submit"
                            className="bg-primary hover:bg-secondary text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Project'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <ProjectList projects={projects} />
        </div>
    )
}

export default ProjectForm