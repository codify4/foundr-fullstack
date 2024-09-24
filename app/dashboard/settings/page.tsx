import { SettingsPage } from "@/components/dashboard/settings-page";
import Sidebar from "@/components/dashboard/sidebar";

export default function page() {
  return (
    <div className="flex flex-col lg:flex-row w-full lg:h-screen p-5 lg:p-0 bg-white dark:bg-neutral-900 text-black dark:text-white border">
        <Sidebar />
        <SettingsPage />
    </div>
  )
}
