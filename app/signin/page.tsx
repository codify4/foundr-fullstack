import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SignInGoogle from "./sign-in-google"
import SignInGithub from "./sign-in-github"


async function LoginPage() {
    return (
        <section className="flex flex-col items-center justify-center h-svh bg-white">
            <Card className="mx-auto w-[500px] shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign In</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-5">
                    <form id="signup-form" className="w-full">
                        <div className="w-full">
                            {/* Make this a seperate component and make it look cool */}
                            <Label htmlFor="Username">foundr.lol/</Label>
                            <Input
                                id="Username"
                                type="Username"
                                name="Username"
                                placeholder="username"
                                required
                            />
                        </div>
                    </form>
                    <div className="flex flex-col items-center justify-center gap-2 w-full">
                        <SignInGoogle />
                        <SignInGithub />
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default LoginPage