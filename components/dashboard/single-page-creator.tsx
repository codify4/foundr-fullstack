"use client"

import { useState } from 'react'
import Sidebar from './sidebar'
import DesignForm from './design-form/design-form'
import Preview from './preview/preview'
import { Project, Social } from '@/types/page-types'
import { SelectGithubCalendar, SelectPage, SelectProject, SelectSocial } from '@/db/schemas/page-schema'
import { ThemeInput } from '@/types/theme-type'

export function SinglePageCreator({ 
  initialSocials, 
  initialProjects, 
  initialPageInfo,
  initialGithubCalendar
}: { 
  initialSocials: SelectSocial[], 
  initialProjects: SelectProject[], 
  initialPageInfo: SelectPage,
  initialGithubCalendar: SelectGithubCalendar
}) {
  const [slug, setSlug] = useState(initialPageInfo.pageSlug)
  const [name, setName] = useState(initialPageInfo.name)
  const [bio, setBio] = useState(initialPageInfo.bio)
  const [avatar, setAvatar] = useState(initialPageInfo.avatar || '')

  const [projects, setProjects] = useState<SelectProject[]>(initialProjects)
  const [socials, setSocials] = useState<SelectSocial[]>(initialSocials)

  const [newProject, setNewProject] = useState<Project>({
    name: '',
    url: '',
    oneLiner: '',
    mrr: '',
  })
  const [newSocial, setNewSocial] = useState<Social>({
    type: '',
    link: ''
  })

  const [username, setUsername] = useState(initialGithubCalendar?.username || '');
  const [theme, setTheme] = useState<string | undefined>(initialGithubCalendar?.theme);

  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row w-full lg:h-screen p-5 lg:p-0 bg-white dark:bg-neutral-900 text-black dark:text-white border">
      {/* Sidebar */}
      <Sidebar 
        slug={slug}
      />

      {/* Left side - Input form */}
      <DesignForm
        slug={slug}
        name={name}
        bio={bio}
        avatar={avatar}
        setSlug={setSlug}
        setName={setName}
        setBio={setBio}
        setAvatar={setAvatar}
        projects={projects}
        socials={socials}
        newProject={newProject}
        newSocial={newSocial}
        setNewProject={setNewProject}
        setNewSocial={setNewSocial}
        isProjectDialogOpen={isProjectDialogOpen}
        isSocialDialogOpen={isSocialDialogOpen}
        setIsProjectDialogOpen={setIsProjectDialogOpen}
        setIsSocialDialogOpen={setIsSocialDialogOpen}
        setProjects={setProjects}
        setSocials={setSocials}
        username={username}
        setUsername={setUsername}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Right side - Preview */}
      <Preview 
        name={name}
        bio={bio}
        avatar={avatar}
        projects={projects}
        socials={socials}
        isProjectDialogOpen={isProjectDialogOpen}
        isSocialDialogOpen={isSocialDialogOpen}
        setIsProjectDialogOpen={setIsProjectDialogOpen}
        setIsSocialDialogOpen={setIsSocialDialogOpen}
        username={username}
        theme={theme}
      />
    </div>
  )
}