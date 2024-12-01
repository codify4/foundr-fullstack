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
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Profile Information</h3>
        <p className="text-sm text-muted-foreground">Update your basic profile information here.</p>
      </div>

      <div className="flex flex-col items-center mb-6">
        <AvatarSelector 
          onAvatarSelect={setAvatar} 
          defaultSelected={avatar} 
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Display Name</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your display name"
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">This is the name that will be displayed on your page.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug" className="text-sm font-medium">Page URL</Label>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">foundr.page/</span>
            <Input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="your-username"
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">Choose a unique URL for your page.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell visitors about yourself"
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">Write a brief description about yourself or your work.</p>
        </div>
      </div>

      <form action={handleAction} className="pt-4">
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="bio" value={bio} />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-black hover:bg-secondary"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  )
}

export default PageInfo