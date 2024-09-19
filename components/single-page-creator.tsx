"use client"

import { useState } from 'react'
import Sidebar from './sidebar'
import DesignForm from './design-form'
import Preview from './preview'

import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

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

const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export function SinglePageCreator() { 
  const queryClient = useQueryClient()

  const { data } = useQuery({ 
    queryKey: ['user'], 
    queryFn: () => fetch(`${api_url}/user/test`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => res.json()) 
  })

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

    console.log(data);
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
    <div className="flex flex-col lg:flex-row w-full lg:h-screen p-5 lg:p-0 bg-white dark:bg-neutral-900 text-black dark:text-white border-2 border-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Left side - Input form */}
      <DesignForm
        name={name}
        avatarUrl={avatarUrl}
        bio={bio}
        projects={projects}
        socials={socials}
        newProject={newProject}
        newSocial={newSocial}
        isProjectDialogOpen={isProjectDialogOpen}
        isSocialDialogOpen={isSocialDialogOpen}
        setIsProjectDialogOpen={setIsProjectDialogOpen}
        setIsSocialDialogOpen={setIsSocialDialogOpen}
        setName={setName}
        setAvatarUrl={setAvatarUrl}
        setBio={setBio}
        setNewProject={setNewProject}
        setNewSocial={setNewSocial}
        addProject={addProject}
        removeProject={removeProject}
        addSocial={addSocial}
        removeSocial={removeSocial}
      />

      {/* Right side - Preview */}
      <Preview 
        name={name}
        avatarUrl={avatarUrl}
        bio={bio}
        projects={projects}
        socials={socials}
        isDesktopPreview={isDesktopPreview}
        isProjectDialogOpen={isProjectDialogOpen}
        isSocialDialogOpen={isSocialDialogOpen}
        setIsProjectDialogOpen={setIsProjectDialogOpen}
        setIsSocialDialogOpen={setIsSocialDialogOpen}
        setIsDesktopPreview={setIsDesktopPreview}
      />
    </div>
  )
}