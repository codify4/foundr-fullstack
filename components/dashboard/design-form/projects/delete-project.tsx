import { deleteProject } from "@/actions/project-actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog";
  

const DeleteProject = ({ id }: { id: number }) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="destructive" size="icon" className="text-white rounded-lg hover:bg-red-600">
                <Trash2 size={20} />
            </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center border-0 rounded-xl w-11/12">
            <DialogHeader className="text-left">
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    You cannot undo this action. This habit will permanently be deleted.
                </DialogDescription>
            </DialogHeader>

            <form 
                action={() => {
                    deleteProject(id)
                    redirect('/dashboard')
                }}
            >
                <Button 
                    type="submit"
                    variant="destructive" 
                    className="w-full text-white rounded-lg hover:bg-red-600"
                >
                    <Trash2 className="mr-2 size-5" />
                    Delete
                </Button>
            </form>
        </DialogContent>
    </Dialog>
    
  )
}

export default DeleteProject