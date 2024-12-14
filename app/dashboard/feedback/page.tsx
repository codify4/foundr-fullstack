import { getSlug } from "@/actions/page-actions";
import FeedbackForm from "@/components/dashboard/feedback-page";
import Sidebar from "@/components/dashboard/sidebar"
import { redirect } from "next/navigation";

export default async function FeedbackPage() {
  const slug = await getSlug();

  if(!slug) redirect('/signin')

  return (
    <div className="flex flex-col lg:flex-row w-full lg:h-screen p-5 lg:p-0 bg-white dark:bg-neutral-900 text-black dark:text-white border">
        <Sidebar 
          slug={slug !== undefined ? slug : ''}
        />
        <FeedbackForm />
    </div>
  )
}