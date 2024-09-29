import { auth } from "@/auth";
import SinglePageWrapper from "@/components/dashboard/single-page-wrapper";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const session = await auth();
	const user = session?.user;

	if (!user) redirect("/signin");

  	return (
		<div>
			<SinglePageWrapper />
		</div>
  	);
}