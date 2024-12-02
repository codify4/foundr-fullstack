import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { SignOut } from "./sign-out"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Badge } from "../ui/badge"
import { getSlug } from "@/actions/page-actions"

export const dynamic = 'force-dynamic'

export async function SettingsPage() {
  const session = await auth();
  const slug = await getSlug();
  const user = session?.user;

  if (!user) redirect("/signin");

  const isPublished = true;

  return (
    <div className="w-full lg:w-2/5 mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and profile</p>
      </div>

      <div className="space-y-6">
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div>
                <h2 className="font-medium mb-2">Account Information</h2>
                <div className="grid gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="flex items-center justify-between">
                      <div>{user?.name || "User"}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="flex items-center justify-between">
                      <div>{user?.email || "email@example.com"}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-medium mb-2">Profile</h2>
                <div className="flex items-center justify-between">
                  <Link href={`https://foundr.vercel.app/${slug}`} target="_blank" className="text-sm hover:text-primary">
                    foundr.me
                  </Link>
                  <Badge variant="outline" className="text-sm text-white bg-primary">
                    {isPublished ? 'Published' : 'Not Published'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="pt-4">
          <SignOut />
        </div>
      </div>
    </div>
  )
}