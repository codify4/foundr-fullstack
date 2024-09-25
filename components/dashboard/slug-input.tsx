'use client'

import { useState } from "react";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { updateSlug } from "@/actions/user-actions";
import { Button } from "../ui/button";

const SlugInput = () => {
    const [slug, setSlug] = useState('toplali');
    
    return (
        <form action={async () => {
            await updateSlug(slug)
        }}>
            <Label htmlFor="slug" className="text-sm font-medium">foundr.lol/</Label>
            <Input
                id="slug"
                autoComplete="off"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-1"
            />

            <Button type="submit" variant="default" className="mt-1 bg-primary hover:bg-secondary text-white">
                Update
            </Button>
        </form>
    )
}
export default SlugInput