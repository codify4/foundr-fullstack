/* Next */
import Link from "next/link"

/* Components */
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SignIn from "./sign-in-button"


async function LoginPage() {
    return (
        <section className="flex flex-col items-center justify-center h-svh bg-white">
            <Card className="mx-auto w-[500px] shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form id="signup-form" className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="Username">Username</Label>
                            <Input
                                id="Username"
                                type="Username"
                                name="Username"
                                placeholder="username"
                                required
                            />
                        </div>
                        <SignIn />
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}

export default LoginPage