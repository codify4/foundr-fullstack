"use client"

import { useState } from 'react'
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { X, Link as LinkIcon, DollarSign, Github, Twitter, Linkedin, Instagram, Facebook, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Image from "next/image"

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

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
}

export function SinglePageCreator1() {
  const [name, setName] = useState('Your Name')
  const [avatarUrl, setAvatarUrl] = useState('/favicon.ico')
  const [bio, setBio] = useState('Your bio goes here...')
  const [projects, setProjects] = useState<Project[]>([])
  const [socials, setSocials] = useState<Social[]>([])
  const [isDesktopPreview, setIsDesktopPreview] = useState(true)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState<Project>({
    name: '',
    link: '',
    description: '',
    revenue: 0
  })
  const [newSocial, setNewSocial] = useState<Social>({
    platform: '',
    url: ''
  })

  const addProject = () => {
    if (newProject.name.trim()) {
      setProjects([...projects, newProject])
      setNewProject({ name: '', link: '', description: '', revenue: 0 })
      setIsProjectDialogOpen(false)
    }
  }

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  const addSocial = () => {
    if (newSocial.platform && newSocial.url.trim()) {
      setSocials([...socials, newSocial])
      setNewSocial({ platform: '', url: '' })
      setIsSocialDialogOpen(false)
    }
  }

  const removeSocial = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index))
  }

  return (
    <div className="flex w-full h-screen bg-white text-black">
      {/* Left side - Input form */}
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
            <Label htmlFor="socials" className="text-sm font-medium">Social Media</Label>
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
            <Label htmlFor="projects" className="text-sm font-medium">Projects</Label>
            <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-1 bg-blue-500 text-white">Add Project</Button>
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

      {/* Right side - Preview */}
      <div className="w-1/2 p-8 overflow-auto text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Preview</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Mobile</span>
            <Switch
              checked={isDesktopPreview}
              onCheckedChange={setIsDesktopPreview}
              className="bg-blue-500"
            />
            <span className="text-sm text-gray-600">Desktop</span>
          </div>
        </div>
        <div className="flex justify-center">
          <div 
            className={`bg-white rounded-xl border overflow-hidden transition-all duration-300 ${
              isDesktopPreview ? 'w-[1024px]' : 'w-[375px]'
            }`}
          >
            <div className="p-8">
              <Image
                src={avatarUrl}
                alt="Avatar"
                width={100}
                height={100}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-lg"
              />
              <h1 className="text-3xl font-bold text-center mb-2">{name}</h1>
              <p className="text-center text-gray-700 whitespace-pre-wrap mb-4">{bio}</p>
              <div className="flex justify-center items-center space-x-4 mb-8">
                {socials.map((social, index) => {
                  const IconComponent = socialIcons[social.platform as keyof typeof socialIcons]
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <IconComponent className="w-6 h-6" />
                    </a>
                  )
                })}
                <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Projects</h2>
                  <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Add Project
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
                <ul className="space-y-6">
                  {projects.map((project, index) => (
                    <li key={index} className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h3 className="text-xl font-semibold mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-700 mb-3">{project.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:text-blue-700 flex items-center"
                        >
                          <LinkIcon className="h-4 w-4 mr-1" />
                          View Project
                        </a>
                        <div className="flex items-center text-green-600">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>{project.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}