import { Card } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarCardProps {
  url: string
  title: string
  isSelected?: boolean
  onSelect?: () => void
}

const AvatarCard = ({ url, title, isSelected, onSelect }: AvatarCardProps) => {
  return (
    <Card 
      className={cn(
        "dark:bg-neutral-800/50 bg-white/50 backdrop-blur-sm shadow-lg rounded-xl cursor-pointer transition-all duration-200 w-full",
        "hover:scale-105 hover:shadow-xl p-1",
        isSelected && "ring-2 ring-black dark:ring-primary-foreground scale-105"
      )}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center justify-between gap-3 py-5 px-3">
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image 
            src={url} 
            alt={title} 
            fill
            className="rounded-full object-cover"
          />
        </div>
        <p className="font-medium text-sm">{title}</p>
      </div>
    </Card>
  )
}
export default AvatarCard