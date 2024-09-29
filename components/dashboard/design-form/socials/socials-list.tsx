import { SelectSocial } from "@/db/schemas/page-schema"
import DeleteSocial from "./delete-social"

const SocialsList = ({ socials }: { socials: SelectSocial[] }) => {
    return (
        <ul className="mt-2 space-y-2">
            {socials?.map((social) => (
                <li key={social.link} className="flex items-center justify-between bg-gray-200 dark:bg-neutral-800 text-black dark:text-white py-2 px-5 rounded-lg my-2">
                    <span>{social.type}</span>
                    <DeleteSocial id={social.id} />
                </li>
            ))}
        </ul>
    )
}
export default SocialsList