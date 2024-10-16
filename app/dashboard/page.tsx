import { auth } from "@/auth";
import SinglePageWrapper from "@/components/dashboard/single-page-wrapper";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  	return (
		<div>
			<SinglePageWrapper />
		</div>
  	);
}