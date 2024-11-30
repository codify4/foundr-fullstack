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
        align: "center",
      }}
      className="w-full max-w-[600px]"
    >
      <CarouselContent className="-ml-2 md:-ml-4 py-5 px-5">
        {avatars.map(avatar => (
          <CarouselItem key={avatar.title} className="pl-2 md:pl-4 basis-1/2 lg:basis-1/2 xl:">
            <div className="flex justify-center">
              <div className="w-full max-w-[200px]">
                <AvatarCard
                  url={avatar.url} 
                  title={avatar.title}
                  isSelected={selectedAvatar === avatar.url}
                  onSelect={() => handleSelect(avatar.url)}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-center gap-2 mt-2">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  )
}
export default AvatarSelector
