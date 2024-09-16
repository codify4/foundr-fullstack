import { Label } from "@radix-ui/react-label"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { X } from "lucide-react"

interface Project {
    name: string;
    link: string;
    description: string;
    revenue: number;
}
  
interface Social {
    platform: string;
    url: string;
}

type DesignFormProps = {
  name: string;
  avatarUrl: string;
  bio: string;
  projects: Project[];
  socials: Social[];
  newProject: Project;
  newSocial: Social;
  isProjectDialogOpen: boolean;
  isSocialDialogOpen: boolean;
  setIsProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSocialDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  setNewProject: React.Dispatch<React.SetStateAction<Project>>;
  setNewSocial: React.Dispatch<React.SetStateAction<Social>>;
  addProject: () => void;
  removeProject: (index: number) => void;
  addSocial: () => void;
  removeSocial: (index: number) => void;
}

const DesignForm = ({ name, avatarUrl, bio, projects, socials, newProject, newSocial, isProjectDialogOpen, isSocialDialogOpen, setIsProjectDialogOpen, setIsSocialDialogOpen, setName, setAvatarUrl, setBio, setNewProject, setNewSocial, addProject, removeProject, addSocial, removeSocial }: DesignFormProps) => {
  return (
    <div className="w-2/5 p-8 overflow-auto">
    <h1 className="text-2xl font-bold mb-6">Create Your Single Page Website</h1>
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="avatar" className="text-sm font-medium">Avatar URL</Label>
        <Input
          id="avatar"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1"
          rows={5}
        />
      </div>
      <div>
        <Label htmlFor="socials" className="text-sm font-medium mr-5">Social Media</Label>
        <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-1 bg-blue-600 hover:bg-blue-700 text-white">Add Social Media</Button>
          </DialogTrigger>
          <DialogContent className='bg-white text-black'>
            <DialogHeader>
              <DialogTitle>Add Social Media Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="socialPlatform" className="text-sm font-medium">Platform</Label>
                <Select
                  onValueChange={(value) => setNewSocial({...newSocial, platform: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="socialUrl" className="text-sm font-medium">URL</Label>
                <Input
                  id="socialUrl"
                  value={newSocial.url}
                  onChange={(e) => setNewSocial({...newSocial, url: e.target.value})}
                  className="mt-1"
                />
              </div>
              <Button onClick={addSocial} className="bg-blue-500 text-white">Add Social Media</Button>
            </div>
          </DialogContent>
        </Dialog>
        <ul className="mt-2 space-y-2">
          {socials.map((social, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span>{social.platform}</span>
              <Button onClick={() => removeSocial(index)} variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Label htmlFor="projects" className="text-sm font-medium mr-5">Projects</Label>
        <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-1 bg-blue-600 hover:bg-blue-700 text-white">Add Project</Button>
          </DialogTrigger>
          <DialogContent className='bg-white text-black'>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName" className="text-sm font-medium">Project Name</Label>
                <Input
                  id="projectName"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="projectLink" className="text-sm font-medium">Project Link</Label>
                <Input
                  id="projectLink"
                  value={newProject.link}
                  onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="projectDescription" className="text-sm font-medium">Project Description</Label>
                <Textarea
                  id="projectDescription"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="projectRevenue" className="text-sm font-medium">Total Revenue</Label>
                <Input
                  id="projectRevenue"
                  type="number"
                  value={newProject.revenue}
                  onChange={(e) => setNewProject({...newProject, revenue: parseFloat(e.target.value)})}
                  className="mt-1"
                />
              </div>
              <Button onClick={addProject} className="bg-blue-500 text-white">Add Project</Button>
            </div>
          </DialogContent>
        </Dialog>
        <ul className="mt-2 space-y-2">
          {projects.map((project, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span>{project.name}</span>
              <Button onClick={() => removeProject(index)} variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  )
}
export default DesignForm