'use client'

import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Social } from "@/types/page-types"
import { X } from "lucide-react"
import { useState } from "react"
import { getPageIdForUser } from "@/actions/page-actions"
import { createSocialLink } from "@/actions/socials-actions"

type SocialFormProps = {
  socials: Social[];
  newSocial: Social;
  setNewSocial: React.Dispatch<React.SetStateAction<Social>>;
  isSocialDialogOpen: boolean;
  setIsSocialDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}  

const SocialForm = ({ socials, newSocial, setNewSocial, isSocialDialogOpen, setIsSocialDialogOpen }: SocialFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateSocialLink = async (formData: FormData) => {
        setIsSubmitting(true)
        try {
            const pageId = await getPageIdForUser()
            
            if (!pageId) {
                throw new Error('User page not found')
            }
        
            await createSocialLink({
                type: newSocial.type as string,
                link: newSocial.link as string,
                pageId: pageId
            })
            
            setIsSubmitting(false)
            setIsSocialDialogOpen(false)
            setNewSocial({ type: '', link: '' })
        } catch (error) {
            console.error('Error creating social link:', error)
            setIsSubmitting(false)
        }
    }
    
    return (
        <div>
            <Label htmlFor="socials" className="text-sm font-medium mr-5">Social Media</Label>
            <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="mt-1 bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-white">Add Social Media</Button>
                </DialogTrigger>
                <DialogContent className='w-11/12 rounded-lg bg-white dark:bg-neutral-900 text-black dark:text-white'>
                    <DialogHeader>
                        <DialogTitle>Add Social Media Link</DialogTitle>
                    </DialogHeader>
                    <form 
                        className="space-y-4"
                        action={handleCreateSocialLink}
                    >
                        <div>
                            <Label htmlFor="socialPlatform" className="text-sm font-medium">Platform</Label>
                            <Select
                                onValueChange={(value) => setNewSocial({...newSocial, type: value})}
                                value={newSocial.type}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-neutral-900 text-black dark:text-white">
                                    <SelectItem value="github">GitHub</SelectItem>
                                    <SelectItem value="twitter">Twitter</SelectItem>
                                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                                    <SelectItem value="instagram">Instagram</SelectItem>
                                    <SelectItem value="facebook">Facebook</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="socialUrl" className="text-sm font-medium">URL</Label>
                            <Input
                                autoComplete="off"
                                id="socialUrl"
                                value={newSocial.link}
                                onChange={(e) => setNewSocial({...newSocial, link: e.target.value})}
                                className="mt-1"
                                required
                            />
                        </div>
                        <Button 
                            type="submit" 
                            className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Social Media'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <ul className="mt-2 space-y-2">
            {socials.map((social) => (
                <li key={social.link} className="flex items-center justify-between bg-white dark:bg-neutral-800 text-black dark:text-white p-2 rounded">
                <span>{social.type}</span>
                <Button 
                    variant="ghost" 
                    size="sm"
                >   
                    {/* Seperate component for deleting social link */}
                    <X className="h-4 w-4" />
                </Button>
                </li>
            ))}
            </ul>
        </div>
    )
}
export default SocialForm