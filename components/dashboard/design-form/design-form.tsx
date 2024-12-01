'use client'

import PageInfo from "./page-info"
import ProjectForm from "./projects/project-form"
import { Project, Social } from "@/types/page-types"
import SocialForm from "./socials/socials-form"
import { SelectProject, SelectSocial } from "@/db/schemas/page-schema"

type DesignFormProps = {
  slug: string;
  name: string;
  bio: string;
  avatar: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  projects: SelectProject[];
  socials: SelectSocial[];
  newProject: Project;
  newSocial: Social;
  isProjectDialogOpen: boolean;
  isSocialDialogOpen: boolean;
  setIsProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSocialDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewProject: React.Dispatch<React.SetStateAction<Project>>;
  setNewSocial: React.Dispatch<React.SetStateAction<Social>>;
  setProjects: React.Dispatch<React.SetStateAction<SelectProject[]>>;
  setSocials: React.Dispatch<React.SetStateAction<SelectSocial[]>>;
}

const DesignForm = ({
  slug,
  name,
  bio,
  avatar,
  setSlug,
  setName,
  setBio,
  setAvatar,
  projects, 
  socials, 
  newProject, 
  newSocial, 
  isProjectDialogOpen, 
  isSocialDialogOpen, 
  setIsProjectDialogOpen, 
  setIsSocialDialogOpen,
  setNewProject, 
  setNewSocial,
  setProjects,
  setSocials
}: DesignFormProps) => {
  return (
    <div className="w-full lg:w-2/5 p-4 md:p-8 overflow-auto overflow-y-scroll no-scrollbar">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Design Your Page</h2>
        <p className="text-muted-foreground">Customize how your page looks and what content it displays.</p>
      </div>
      <div className="space-y-8">
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <PageInfo 
            slug={slug}
            name={name}
            bio={bio}
            avatar={avatar}
            setSlug={setSlug}
            setName={setName}
            setBio={setBio}
            setAvatar={setAvatar}
          />
        </div>
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <ProjectForm 
            projects={projects}
            newProject={newProject}
            open={isProjectDialogOpen}
            setOpen={setIsProjectDialogOpen}
            setNewProject={setNewProject}
            setProjects={setProjects}
          />
        </div>
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <SocialForm 
            socials={socials}
            newSocial={newSocial}
            isSocialDialogOpen={isSocialDialogOpen}
            setIsSocialDialogOpen={setIsSocialDialogOpen}
            setNewSocial={setNewSocial}
            setSocials={setSocials}
          />
        </div>
      </div>
    </div>
  )
}
export default DesignForm