import { CardBody } from "@/components/ui/card";
import { CheckboxLabel } from "@/components/ui/checkbox";
import { SectionSubtitle } from "@/components/ui/title";

import {
	PERMISSIONS,
	PERMISSIONS_ACTIONS,
	PERMISSIONS_LABELS,
} from "@/constants";

export default function UserPermissions({
	permissions,
	role,
}: { permissions: string; role: string }) {
	const permissionsGrouped = [] as { section: string; actions: string[] }[];
	for (const permission of PERMISSIONS) {
		const [section, action] = permission.split(".");
		const hasPermission = permissionsGrouped.find((p) => p.section === section);
		if (hasPermission) {
			hasPermission.actions.push(action);
		} else {
			permissionsGrouped.push({ section, actions: [action] });
		}
	}

	return (
		<CardBody className="grid grid-cols-2 md:grid-cols-3  gap-y-4">
			{permissionsGrouped.map((permission) => (
				<div key={permission.section} className="flex flex-col gap-y-2">
					<SectionSubtitle>
						{(PERMISSIONS_LABELS as any)[permission.section]}
					</SectionSubtitle>
					<ul className="flex flex-col gap-y-2">
						{permission.actions.map((action) => (
							<li key={`${permission.section}.${action}`}>
								<CheckboxLabel
									defaultChecked={
										permissions === "all" ||
										role === "admin" ||
										permissions.includes(`${permission.section}.${action}`)
									}
									disabled={role === "admin"}
									id={`${permission.section}.${action}`}
								>
									{(PERMISSIONS_ACTIONS as any)[action]}
								</CheckboxLabel>
							</li>
						))}
					</ul>
				</div>
			))}
		</CardBody>
	);
}
