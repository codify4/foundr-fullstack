import { redirect } from "next/navigation"
import IntialForm from "./components/initial-form"
import { auth } from "@/auth";

async function FormPage() {
    const session = await auth();
	const user = session?.user;

	if(!user) redirect('/signin')
    
    return (
        <div className="flex flex-col items-center justify-center h-svh w-full bg-white">
            <IntialForm />
        </div>
    )
}
export default FormPage