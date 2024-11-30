'use client'

import AvatarCard from "./avatar-card"
import { avatars } from "@/constants/avatars"
import { useState, useEffect } from "react"

interface AvatarSelectorProps {
  onAvatarSelect?: (url: string) => void;
  defaultSelected?: string;
}

const AvatarSelector = ({ onAvatarSelect, defaultSelected }: AvatarSelectorProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(defaultSelected || null)

  useEffect(() => {
    setSelectedAvatar(defaultSelected || null)
  }, [defaultSelected])

  const handleSelect = (url: string) => {
    setSelectedAvatar(url)
    onAvatarSelect?.(url)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {avatars.map(avatar => (
        <AvatarCard 
          key={avatar.title} 
          url={avatar.url} 
          title={avatar.title}
          isSelected={selectedAvatar === avatar.url}
          onSelect={() => handleSelect(avatar.url)}
        />
      ))}
    </div>
  )
}
export default AvatarSelector