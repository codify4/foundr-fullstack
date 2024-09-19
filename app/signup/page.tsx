/* Components */
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"


function SignupPage() {
    return (
        <section className="flex flex-col items-center justify-center h-svh bg-white">
            <Card className="mx-auto w-[500px] shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form id="signup-form" className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">foundr.lol/</Label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="username"
                                required
                            />
                        </div>
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
                                placeholder="**********"
                                required 
                            />
                        </div>
                        <Button className="bg-black hover:bg-primary ease-in-out duration-300 w-full">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p>
                        Already have an account?{" "}
                        <Link href="/signin" className="underline">Login</Link>
                    </p>
                </CardFooter>
            </Card>
        </section>
    )
}

export default SignupPage