import Divider from "@/components/divider";
import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardSubtitle,
	CardTitle,
	Label,
	Switch,
	SwitchContainer,
} from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { getDefaultPOSAccessEnabled } from "@/core/modules/settings";
import Link from "next/link";
import DashboardPermissions from "./dashboard-permissions";

import { access } from "@/core/modules/users";
import type { UserBasic } from "../page";

export default async function UserPermissions({
	user,
}: {
	user: UserBasic;
}) {
	const { defaultPOSAccessEnabled } = await getDefaultPOSAccessEnabled();
	const hasPOSAccess = await access.getPOSAccess(user._id);

	const updateUserPOSAccess = access.updatePOSAccess.bind(null, user._id);

	const isAdmin = user.role === "admin";

	return (
		<TabsContent value={user.username}>
			<Card>
				<CardHeader>
					<CardTitle>
						{user.name}
						<small className="text-zinc-500 text-sm ml-2">
							({user.username})
						</small>
					</CardTitle>
					<CardDescription>{user.email}</CardDescription>
					<div className="absolute top-4 right-4">
						<Badge variant="secondary" className="capitalize">
							{user.role}
						</Badge>
					</div>
				</CardHeader>
				<Divider />
				<div>
					<DashboardPermissions isAdmin={isAdmin} _id={user._id} />
					<Divider />
					<CardBody>
						<CardSubtitle>Punto de Ventas</CardSubtitle>
						<CardDescription className="max-w-3xl">
							Permite a este usuario acceder al punto de ventas, puedes
							habilitar o deshabilitar el punto de ventas por defecto para todos
							los usuarios{" "}
							<Link
								className="underline hover:text-purple-500"
								href="/dashboard/settings/general/pos#default-access"
							>
								aquí
							</Link>
							.
						</CardDescription>
						<form action={updateUserPOSAccess}>
							<SwitchContainer>
								<Switch
									id="pos-enabled"
									defaultChecked={
										(defaultPOSAccessEnabled && hasPOSAccess) || hasPOSAccess
									}
									type="submit"
								/>
								<Label htmlFor="pos-enabled">Habilitar acceso</Label>
							</SwitchContainer>
						</form>
					</CardBody>
				</div>
			</Card>
		</TabsContent>
	);
}
