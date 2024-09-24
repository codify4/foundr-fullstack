import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { SignOut } from "./sign-out"

export function SettingsPage() {
  // This would typically come from your app's state or props
  const user = {
    name: "John Doe",
    email: "john@example.com"
  }
  const isPublished = true

  return (
    <div className="w-1/3 mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Name</h2>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Email</h2>
            <p className="text-lg">{user.email}</p>
          </div>
        </CardContent>
      </Card>
      
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
      
      <SignOut />
    </div>
  )
}