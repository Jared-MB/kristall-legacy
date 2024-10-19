"use client";

import { Switch } from "@/components/ui";
import { useFormStatus } from "react-dom";

export default function SwitchDashboard({
	isAdmin,
	enabledDashboard,
}: {
	isAdmin: boolean;
	enabledDashboard: boolean;
}) {
	const { pending } = useFormStatus();

	return (
		<Switch
			id="dashboard-enabled"
			defaultChecked={isAdmin || enabledDashboard}
			disabled={isAdmin || pending}
			type="submit"
		/>
	);
}
