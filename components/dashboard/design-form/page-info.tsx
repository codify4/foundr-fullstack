'use client'

import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { getPageIdForUser, updatePage } from '@/actions/page-actions'
import { InsertPage, SelectImage } from '@/db/schemas/page-schema'
import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '@/lib/get-session'
import { UploadDropzone } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'

type PageInfoProps = {
  slug: string;
  name: string;
  image: string;
  bio: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
}

const PageInfo = ({ slug, name, image, bio, setSlug, setName, setImage, setBio }: PageInfoProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

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
      
      if (pageId) {
        await updatePage(pageId, pageData)
        console.log('Page updated successfully')
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
        <Label htmlFor="image" className="text-sm font-medium">Profile Image</Label>
        {image && (
          <div className="mt-2 mb-4">
            <img 
              src={image} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        )}
        <UploadDropzone 
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res && res[0]) {
              const uploadedUrl = res[0].url;
              setImage(uploadedUrl);
              router.refresh(); // Refresh the page to show updated image
              console.log("Upload completed:", uploadedUrl);
            }
          }}
          onUploadError={(error: Error) => {
            console.error(`Upload failed: ${error.message}`);
          }}
          onUploadBegin={() => {
            console.log("Upload starting...");
          }}
          appearance={{
            container: "mt-2 w-full",
            button: "ut-uploading:cursor-not-allowed bg-black px-5 rounded-lg hover:bg-gray-900 ut-uploading:bg-gray-600",
            allowedContent: "text-sm text-gray-600 dark:text-gray-400",
          }}
        />
      </div>
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