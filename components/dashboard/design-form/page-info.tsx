'use client'

import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { getPageIdForUser, createPage, updatePage } from '@/actions/page-actions'
import { InsertPage } from '@/db/schemas/page-schema'
import { redirect } from 'next/navigation'

const PageInfo = ({ userId }: { userId: string }) => {
  const [slug, setSlug] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [bio, setBio] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAction = async (formData: FormData) => {
    setIsSubmitting(true)
    const pageData: Omit<InsertPage, 'id' | 'createdAt' | 'updatedAt'> = {
      pageSlug: formData.get('slug') as string,
      name: formData.get('name') as string,
      image: formData.get('image') as string,
      bio: formData.get('bio') as string,
      userId: userId
    }

    try {
      const pageId = await getPageIdForUser()
      
      if (pageId) {
        await updatePage(pageId, pageData)
      } else {
        await createPage(pageData)
      }
      
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
          required
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
          required
        />
      </div>
      <div>
        <Label htmlFor="avatar" className="text-sm font-medium">Avatar URL</Label>
        <Input
          id="avatar"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1"
          required
        />
      </div>
      <div>
        <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1"
          rows={5}
          required
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className='hover:bg-secondary'>
        {isSubmitting ? 'Updating...' : 'Save Page'}
      </Button>
    </form>
  )
}

export default PageInfo