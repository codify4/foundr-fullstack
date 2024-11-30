'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import AvatarCard from "./avatar-card"
import { avatars } from "@/constants/avatars"
import { useState, useEffect } from "react"

interface AvatarSelectorProps {
  onAvatarSelect?: (url: string) => void;
  defaultSelected?: string;
}

const AvatarSelector = ({ onAvatarSelect, defaultSelected }: AvatarSelectorProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(defaultSelected || "")

  useEffect(() => {
    setSelectedAvatar(defaultSelected || "")
  }, [defaultSelected])

  const handleSelect = (url: string) => {
    setSelectedAvatar(url)
    onAvatarSelect?.(url)
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="w-11/12">
        {avatars.map(avatar => (
          <CarouselItem key={avatar.title} className="md:basis-1/2 lg:basis-1/3">
            <AvatarCard
              url={avatar.url} 
              title={avatar.title}
              isSelected={selectedAvatar === avatar.url}
              onSelect={() => handleSelect(avatar.url)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
export default AvatarSelector
