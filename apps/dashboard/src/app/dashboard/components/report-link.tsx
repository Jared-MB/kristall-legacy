import Divider from "@/components/divider";
import NavLink from "@/components/nav-link";
import Routes from "@/constants/routes";
import { shop } from "@kristall/core/modules/shop";
import { Users } from "lucide-react";

export default async function ReportLink() {
	const isAdmin = await shop.isAdmin();

	if (!isAdmin) {
		return null;
	}

	return (
		<>
			<Divider />
			<NavLink icon={<Users />} href={Routes.REPORTS}>
				Reportes
			</NavLink>
		</>
	);
}
