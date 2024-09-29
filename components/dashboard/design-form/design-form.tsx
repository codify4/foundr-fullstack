import PageInfo from "./page-info"
import ProjectForm from "./project-form"
import { Project, Social } from "@/types/page-types"
import SocialForm from "./socials-form"


type DesignFormProps = {
  slug: string;
  name: string;
  image: string;
  bio: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  projects: Project[];
  socials: Social[];
  newProject: Project;
  newSocial: Social;
  isProjectDialogOpen: boolean;
  isSocialDialogOpen: boolean;
  setIsProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSocialDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewProject: React.Dispatch<React.SetStateAction<Project>>;
  setNewSocial: React.Dispatch<React.SetStateAction<Social>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setSocials: React.Dispatch<React.SetStateAction<Social[]>>;
}

const DesignForm = ({
  slug,
  name,
  image,
  bio,
  setSlug,
  setName,
  setImage,
  setBio,
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
      <div className="w-full lg:w-2/5 p-4 md:p-8 overflow-auto">
        <h1 className="text-xl lg:text-2xl font-bold mb-6">Create Your Single Page Website</h1>
        <div className="space-y-4">
          <PageInfo
            slug={slug}
            name={name}
            image={image}
            bio={bio}
            setSlug={setSlug}
            setName={setName}
            setImage={setImage} 
            setBio={setBio}
          />
          <SocialForm
            socials={socials}
            setSocials={setSocials}
            newSocial={newSocial}
            setNewSocial={setNewSocial}
            isSocialDialogOpen={isSocialDialogOpen}
            setIsSocialDialogOpen={setIsSocialDialogOpen}
          />
          <ProjectForm 
            open={isProjectDialogOpen} 
            setOpen={setIsProjectDialogOpen}
            projects={projects}
            setProjects={setProjects}
            newProject={newProject}
            setNewProject={setNewProject}
          />
        </div>
    </div>
  )
}
export default DesignForm