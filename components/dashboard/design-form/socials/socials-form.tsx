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
import { SelectSocial } from "@/db/schemas/page-schema"
import SocialsList from "./socials-list"

type SocialFormProps = {
  socials: SelectSocial[];
  setSocials: React.Dispatch<React.SetStateAction<SelectSocial[]>>;
  newSocial: Social;
  setNewSocial: React.Dispatch<React.SetStateAction<Social>>;
  isSocialDialogOpen: boolean;
  setIsSocialDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}  

const SocialForm = ({ socials, setSocials, newSocial, setNewSocial, isSocialDialogOpen, setIsSocialDialogOpen }: SocialFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateSocialLink = async () => {
        setIsSubmitting(true)
        try {
            const pageId = await getPageIdForUser()
            
            if (!pageId) {
                throw new Error('User page not found')
            }
        
            const createdSocialLink = await createSocialLink({
                type: newSocial.type as string,
                link: newSocial.link as string,
                pageId: pageId
            });
            setSocials(prevSocials => [...(prevSocials || []), createdSocialLink]);

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
            <div className="space-y-2 mb-4">
                <Label htmlFor="socials" className="text-lg font-semibold">Social Media</Label>
                <p className="text-sm text-muted-foreground">Connect with your audience across platforms.</p>
            </div>

            <SocialsList socials={socials} />
            
            <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="mt-4 w-full bg-black hover:bg-secondary text-white">
                        Add Social Media Link
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[500px] rounded-lg bg-background'>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Add Social Media Link</DialogTitle>
                        <p className="text-sm text-muted-foreground">Connect your social media profiles.</p>
                    </DialogHeader>
                    <form 
                        className="space-y-6 py-4"
                        action={handleCreateSocialLink}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="socialPlatform" className="text-sm font-medium">Platform</Label>
                            <Select
                                onValueChange={(value) => setNewSocial({...newSocial, type: value})}
                                value={newSocial.type}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose a platform" />
                                </SelectTrigger>
                                <SelectContent className="bg-background">
                                    <SelectItem value="github">GitHub</SelectItem>
                                    <SelectItem value="twitter">Twitter</SelectItem>
                                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                                    <SelectItem value="instagram">Instagram</SelectItem>
                                    <SelectItem value="facebook">Facebook</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">Select which social media platform to link.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="socialUrl" className="text-sm font-medium">Profile URL</Label>
                            <Input
                                autoComplete="off"
                                id="socialUrl"
                                value={newSocial.link}
                                onChange={(e) => setNewSocial({...newSocial, link: e.target.value})}
                                className="w-full"
                                placeholder="https://"
                                required
                            />
                            <p className="text-xs text-muted-foreground">Enter the full URL to your social media profile.</p>
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full bg-black hover:bg-secondary text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding Link...' : 'Add Social Link'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default SocialForm