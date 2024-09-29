import { SelectProject } from "@/db/schemas/page-schema"
import DeleteProject from "./delete-project"

const ProjectList = ({ projects }: { projects: SelectProject[] }) => {
  return (
    <div>
        {projects?.map((project) => (
            <div key={project.name} className="flex items-center justify-between bg-gray-200 dark:bg-neutral-800 text-black dark:text-white py-3 px-5 rounded-lg my-2">
                <span>{project.name}</span>
                <DeleteProject id={project.id} />
            </div>
        ))}
    </div>
  )
}
export default ProjectList