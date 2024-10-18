'use client'

import PageInfo from "@/components/dashboard/design-form/page-info"
import { useState } from "react"

function IntialForm() {
    const [slug, setSlug] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [bio, setBio] = useState('')
    
    return (
        <div className="flex flex-col items-center justify-center w-full bg-white">
            <PageInfo
                slug={slug}
                name={name}
                image={image}
                bio={bio}
                setSlug={setSlug}
                setName={setName}
                setImage={setImage} 
                setBio={setBio}
            />
        </div>
    )
}
export default IntialForm