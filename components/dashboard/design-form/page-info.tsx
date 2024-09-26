import { Label } from "@/components/ui/label"
import SlugInput from "./slug-input"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


const PageInfo = () => {
  return (
        <div className="gap-5">
            <SlugInput />
            <div>
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input
                    id="name"
                    autoComplete="off"
                    className="mt-1"
                />
            </div>
            <div>
                <Label htmlFor="avatar" className="text-sm font-medium">Avatar URL</Label>
                <Input
                    id="avatar"
                    className="mt-1"
                />
            </div>
            <div>
                <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                <Textarea
                    id="bio"
                    className="mt-1"
                    rows={5}
                />
            </div>
        </div>
    )
}
export default PageInfo