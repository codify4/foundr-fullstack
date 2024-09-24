import { LogOut, Settings, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SignOut } from "./sign-out"

export function TopNavbarComponent() {
  return (
    <NavigationMenu className="w-full max-w-none justify-between px-7 py-2">
      <NavigationMenuList>
        <NavigationMenuItem className="flex items-center space-x-2">
          <div className="flex flex-row items-center justify-center">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <Image src="/foundr.png" width={40} height={40} alt="foundr" />
              <span className="text-lg font-semibold">Foundr</span>
            </Link>
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>John Doe</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="flex flex-col items-center justify-center gap-2 w-full">
              <span>email@example.com</span>
              <SignOut />
            </PopoverContent>
          </Popover>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}