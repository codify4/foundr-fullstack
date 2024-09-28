"use client"

import { useState } from 'react'
import Sidebar from './sidebar'
import DesignForm from './design-form/design-form'
import Preview from './preview/preview'
import { Project, Social } from '@/types/page-types'

export function SinglePageCreator() {

  const [slug, setSlug] = useState('toplali');
  const [name, setName] = useState('Mr. Founder')
  const [avatarUrl, setAvatarUrl] = useState('/favicon.ico')
  const [bio, setBio] = useState('10x software engineer, 10x designer, 10x developer')
  const [projects, setProjects] = useState<Project[]>([])
  const [socials, setSocials] = useState<Social[]>([])
  const [isDesktopPreview, setIsDesktopPreview] = useState(true)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState<Project>({
    name: '',
    url: '',
    oneLiner: '',
    mrr: '',
  })
  const [newSocial, setNewSocial] = useState<Social>({
    platform: '',
    url: ''
  })

  const addProject = () => {
    if (newProject.name.trim()) {
      setProjects([...projects, newProject])
      setNewProject({ name: '', url: '', oneLiner: '', mrr: '' })
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
    <div className="flex flex-col lg:flex-row w-full lg:h-screen p-5 lg:p-0 bg-white dark:bg-neutral-900 text-black dark:text-white border">
      {/* Sidebar */}
      <Sidebar />

      {/* Left side - Input form */}
      <DesignForm
        projects={projects}
        socials={socials}
        newProject={newProject}
        newSocial={newSocial}
        isProjectDialogOpen={isProjectDialogOpen}
        isSocialDialogOpen={isSocialDialogOpen}
        setIsProjectDialogOpen={setIsProjectDialogOpen}
        setIsSocialDialogOpen={setIsSocialDialogOpen}
        setNewProject={setNewProject}
        setNewSocial={setNewSocial}
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