'use client'

import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { getPageIdForUser, updatePage } from '@/actions/page-actions'
import { InsertPage } from '@/db/schemas/page-schema'
import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '@/lib/get-session'
import AvatarSelector from './avatars/avatar-selector'

type PageInfoProps = {
  slug: string;
  name: string;
  bio: string;
  avatar: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
}

const PageInfo = ({ slug, name, bio, avatar, setSlug, setName, setBio, setAvatar }: PageInfoProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAction = async (formData: FormData) => {
    const user = await getAuthenticatedUser();
    const userId = user?.id || '';
    setIsSubmitting(true)
    
    const pageData: Omit<InsertPage, 'id' | 'createdAt' | 'updatedAt'> = {
      pageSlug: formData.get('slug') as string,
      name: formData.get('name') as string,
      bio: formData.get('bio') as string,
      avatar: avatar,
      userId: userId
    }

    try {
      const pageId = await getPageIdForUser()
      
      if (pageId) {
        await updatePage(pageId, pageData)
        console.log('Page updated successfully')
      }
      setIsSubmitting(false)
      redirect('/dashboard')
    } catch (error) {
      console.error('Error updating page:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Avatar</Label>
        <div className="mt-2">
          <AvatarSelector 
            onAvatarSelect={setAvatar} 
            defaultSelected={avatar} 
          />
        </div>
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter your page slug"
        />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
        />
      </div>

      <form action={handleAction}>
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="bio" value={bio} />
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-secondary rounded-lg dark:text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  )
}

export default PageInfo