'use client'

import { createPageAndRedirect } from "@/actions/page-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { InsertPage } from "@/db/schemas/page-schema"
import { getAuthenticatedUser } from "@/lib/get-session"
import { UploadButton } from "@/lib/uploadthing"
import { revalidatePath } from "next/cache"
import { useState } from "react"

function IntialForm() {
    const [slug, setSlug] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
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
            await createPageAndRedirect(pageData)
        } catch (error) {
            console.error('Error creating/updating page:', error)
            setIsSubmitting(false)
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center w-full bg-white">
            <form 
                className="space-y-5 w-full"
                action={handleAction}
            >   
                <UploadButton 
                    endpoint="imageUploader"
                    onClientUploadComplete={() => {
                      revalidatePath('/form')
                    }}
                    className="w-full bg-primary text-white rounded-lg py-2 px-4 text-sm font-medium"
                />
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
                <div className="w-full flex items-center justify-center">
                    <Button type="submit" disabled={isSubmitting} className='w-full inline-flex items-center justify-center whitespace-nowrap rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-primary h-9 px-4 py-2 group relative gap-2 overflow-hidden tracking-tighter transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2'>
                        {isSubmitting ? 'Creating...' : 'Create Page'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default IntialForm