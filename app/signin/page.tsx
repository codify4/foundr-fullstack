import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SignInGoogle from "./sign-in-google"
import SignInGithub from "./sign-in-github"
import { auth } from "@/auth"
import { redirect } from "next/navigation"


async function LoginPage() {
    const session = await auth();
    const user = session?.user;

    if (user) redirect("/dashboard");
    return (
        <section className="flex flex-col items-center justify-center h-svh bg-white">
            <Card className="mx-auto w-[500px] shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign In</CardTitle>
                    <CardDescription>Choose a provider to sign in</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-5">
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