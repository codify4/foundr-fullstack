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
            <div className="space-y-2 mb-4">
                <Label htmlFor="projects" className="text-lg font-semibold">Projects</Label>
                <p className="text-sm text-muted-foreground">Showcase your work and achievements.</p>
            </div>

            <ProjectList projects={projects} />
            
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="mt-4 w-full bg-black hover:bg-secondary text-white">
                        Add New Project
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[500px] rounded-lg bg-background'>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Add New Project</DialogTitle>
                        <p className="text-sm text-muted-foreground">Share details about your project with visitors.</p>
                    </DialogHeader>
                    <form 
                        className="space-y-6 py-4"
                        action={handleCreateProject}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">Project Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={newProject.name}
                                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                                className="w-full"
                                placeholder="Enter project name"
                                required
                                autoComplete='off'
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="url" className="text-sm font-medium">Project URL</Label>
                            <Input
                                id="url"
                                name="url"
                                value={newProject.url}
                                onChange={(e) => setNewProject({...newProject, url: e.target.value})}
                                className="w-full"
                                placeholder="https://"
                                required
                                autoComplete='off'
                            />
                            <p className="text-xs text-muted-foreground">Link to your project's website or repository.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="oneLiner" className="text-sm font-medium">Project Description</Label>
                            <Textarea
                                id="oneLiner"
                                name="oneLiner"
                                value={newProject.oneLiner}
                                onChange={(e) => setNewProject({...newProject, oneLiner: e.target.value})}
                                className="w-full min-h-[80px]"
                                placeholder="Brief description of your project"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mrr" className="text-sm font-medium">Monthly Revenue</Label>
                            <Input
                                id="mrr"
                                name="mrr"
                                value={newProject.mrr}
                                onChange={(e) => setNewProject({...newProject, mrr: e.target.value})}
                                className="w-full"
                                placeholder="$0"
                                autoComplete='off'
                            />
                            <p className="text-xs text-muted-foreground">Share your project's monthly recurring revenue.</p>
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding Project...' : 'Add Project'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProjectForm