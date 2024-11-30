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
        "dark:bg-neutral-800 bg-white shadow-lg rounded-xl cursor-pointer transition-all duration-200",
        "hover:scale-105",
        isSelected && "ring-2 ring-black scale-105"
      )}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center gap-2 p-4">
        <Image 
          src={url} 
          alt={title} 
          width={100} 
          height={100} 
          className="rounded-full"
        />
        <p className="font-medium">{title}</p>
      </div>
    </Card>
  )
}
export default AvatarCard