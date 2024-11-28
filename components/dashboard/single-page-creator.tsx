"use client"

import { useState } from 'react'
import Sidebar from './sidebar'
import DesignForm from './design-form/design-form'
import Preview from './preview/preview'
import { Project, Social } from '@/types/page-types'
import { SelectPage, SelectProject, SelectSocial, SelectImage } from '@/db/schemas/page-schema'
import { PageWithImage } from '@/actions/page-actions'

export function SinglePageCreator({ 
  initialSocials, 
  initialProjects, 
  initialPageInfo 
}: { 
  initialSocials: SelectSocial[], 
  initialProjects: SelectProject[], 
  initialPageInfo: PageWithImage
}) {
  const [slug, setSlug] = useState(initialPageInfo.pageSlug)
  const [name, setName] = useState(initialPageInfo.name)
  const [image, setImage] = useState<string>(initialPageInfo.image.url)
  const [bio, setBio] = useState(initialPageInfo.bio)

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

  const [isDesktopPreview, setIsDesktopPreview] = useState(true)
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
        image={image}
        bio={bio}
        setSlug={setSlug}
        setName={setName}
        setImage={setImage}
        setBio={setBio}
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
      />

      {/* Right side - Preview */}
      <Preview 
        name={name}
        bio={bio}
        avatarUrl={image}
        projects={projects}
        socials={socials}
        isDesktopPreview={isDesktopPreview}
        setIsDesktopPreview={setIsDesktopPreview}
        isProjectDialogOpen={isProjectDialogOpen}
        isSocialDialogOpen={isSocialDialogOpen}
        setIsProjectDialogOpen={setIsProjectDialogOpen}
        setIsSocialDialogOpen={setIsSocialDialogOpen}
      />
    </div>
  )
}