import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "../ui/input"

const FeedbackForm = () => {
  return (
    <div className="w-full lg:w-2/5 mx-auto py-6">
        <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-1">Submit Feedback</h1>
            <p className="text-muted-foreground">Request features, suggest improvements, or report bugs</p>
        </div>

        <div className="space-y-6">
            <Card className="shadow-md">
                <CardContent className="pt-6">
                    <form className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="type">Feedback Type</Label>
                            <Select name="type">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select feedback type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="feature">New Feature Request</SelectItem>
                                    <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                                    <SelectItem value="bug">Bug Report</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                                placeholder="Brief description of your feedback"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Detailed Description</Label>
                            <Textarea
                                name="description"
                                placeholder="Please provide as much detail as possible..."
                                className="min-h-[150px]"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-black hover:bg-secondary text-white rounded-lg">
                            Submit Feedback
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
export default FeedbackForm