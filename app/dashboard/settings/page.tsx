import { getSlug } from "@/actions/page-actions";
import { SettingsPage } from "@/components/dashboard/settings-page";
import Sidebar from "@/components/dashboard/sidebar";

export default async function page() {
  const slug = await getSlug();

  return (
    <div className="flex flex-col lg:flex-row w-full lg:h-screen p-5 lg:p-0 bg-white dark:bg-neutral-900 text-black dark:text-white border">
        <Sidebar 
          slug={slug}
        />
        <SettingsPage />
    </div>
  )
}
