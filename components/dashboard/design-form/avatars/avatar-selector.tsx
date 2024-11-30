import AvatarCard from "./avatar-card"
import { avatars } from "@/constants/avatars"
import { useState } from "react"

const AvatarSelector = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {avatars.map(avatar => (
        <AvatarCard 
          key={avatar.title} 
          url={avatar.url} 
          title={avatar.title}
          isSelected={selectedAvatar === avatar.title}
          onSelect={() => setSelectedAvatar(avatar.title)}
        />
      ))}
    </div>
  )
}
export default AvatarSelector