import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"
 
export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
      className="w-full"
    >
      <Button 
        type="submit"
        variant="default"
        className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-primary h-9 px-4 py-2 group relative gap-2 overflow-hidden tracking-tighter transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
      >
        <Chrome size={20}/>
        Sign In with Google
      </Button>
    </form>
  )
} 