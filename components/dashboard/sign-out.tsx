import { signOut } from "@/auth"
import { Button } from "../ui/button"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button variant="destructive" type="submit" className="text-white">Log Out</Button>
    </form>
  )
}