import { redirect } from "next/navigation"
import IntialForm from "./components/initial-form"
import { auth } from "@/auth";
import { Card } from "@/components/ui/card";

async function FormPage() {
    const session = await auth();
	const user = session?.user;

	if(!user) redirect('/signin')
    
    return (
        <div className="flex flex-col items-center justify-center h-svh w-svw bg-white px-4 py-8 gap-10">
            <h1 className="text-black text-3xl md:text-4xl font-extrabold">Firstly, your page info!</h1>
            <Card className="flex flex-col items-center justify-center w-11/12 md:w-2/5 bg-white px-5 py-8">
                <IntialForm />
            </Card>
        </div>

    )
}
export default FormPage