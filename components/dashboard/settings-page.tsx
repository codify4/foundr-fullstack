import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { SignOut } from "./sign-out"
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/signin");

  const isPublished = true;

  return (
    <div className="w-1/2 mx-auto my-2 p-6 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Name</h2>
            <p className="text-lg font-semibold">{user?.name || "User"}</p>
          </div>
          
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Email</h2>
            <p className="text-lg">{user?.email || "email@example.com"}</p>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Status</h2>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Link href="/foundr/me" className="text-lg font-semibold hover:underline">
                foundr/me
              </Link>
              <span 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isPublished ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}
                aria-label={isPublished ? "Published" : "Not Published"}
              >
                {isPublished ? 'Published' : 'Not Published'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <SignOut />
    </div>
  )
}