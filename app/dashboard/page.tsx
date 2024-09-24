import { auth } from "@/auth";
import { SinglePageCreator } from "@/components/dashboard/single-page-creator";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const session = await auth();
	const user = session?.user;

	if (!user) redirect("/signin");
	
  	return (
		<div>
			<SinglePageCreator />
		</div>
  	);
}