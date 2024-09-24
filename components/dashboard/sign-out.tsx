import { signOut } from "@/auth"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button variant="destructive" type="submit" className="text-white">
        <LogOut className="mr-2 h-4 w-4" />
        Log Out
      </Button>
    </form>
  )
}