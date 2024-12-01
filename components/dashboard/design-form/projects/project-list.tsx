import { SelectProject } from "@/db/schemas/page-schema"
import DeleteProject from "./delete-project"
import EditProject from "./edit-project"
import { ExternalLink, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

const ProjectList = ({ projects }: { projects: SelectProject[] }) => {
  if (!projects?.length) {
    return (
      <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed">
        <p className="text-muted-foreground">No projects added yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {projects?.map((project) => (
        <div 
          key={project.name} 
          className="group bg-card hover:bg-muted/50 border shadow-sm rounded-lg p-4 transition-colors"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{project.name}</h3>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.oneLiner}</p>
              {project.mrr && (
                <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-500">
                  <DollarSign className="h-3 w-3" />
                  <span>{project.mrr}/mo</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DeleteProject id={project.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectList