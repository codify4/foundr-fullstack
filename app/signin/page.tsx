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
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                name="password"
                                required 
                            />
                        </div>
                        <Button className="bg-black hover:bg-primary w-full">
                            Login
                        </Button>
                    </form>
                    <div className="flex flex-row items-center justify-center gap-2 mt-4 text-md">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign Up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default LoginPage