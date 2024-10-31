'use client'

import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { getPageIdForUser, createPage, updatePage } from '@/actions/page-actions'
import { InsertPage } from '@/db/schemas/page-schema'
import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '@/lib/get-session'

type PageInfoProps = {
  slug: string;
  name: string;
  image?: string;
  bio: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
}

const PageInfo = ({ slug, name, image, bio, setSlug, setName, setImage, setBio }: PageInfoProps) => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAction = async (formData: FormData) => {
    const user = await getAuthenticatedUser();
    const userId = user?.id || '';
    setIsSubmitting(true)
    
    const pageData: Omit<InsertPage, 'id' | 'createdAt' | 'updatedAt'> = {
      pageSlug: formData.get('slug') as string,
      name: formData.get('name') as string,
      bio: formData.get('bio') as string,
      userId: userId
    }

    try {
      const pageId = await getPageIdForUser()
      
      if (pageId) await updatePage(pageId, pageData)
      setIsSubmitting(false)
      redirect('/dashboard')
    } catch (error) {
      console.error('Error creating/updating page:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <form 
      className="space-y-5"
      action={handleAction}
    >
      <div>
        <Label htmlFor="slug" className="text-sm font-medium">foundr.lol/</Label>
        <Input
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          autoComplete="off"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          className="mt-1"
        />
      </div>
      {/* <div>
        <Label htmlFor="image" className="text-sm font-medium">Avatar URL</Label>
        <Input
          id="image"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1"
        />
      </div> */}
      <div>
        <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1"
          rows={5}
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className='hover:bg-secondary'>
        {isSubmitting ? 'Updating...' : 'Publish Changes'}
      </Button>
    </form>
  )
}

export default PageInfo