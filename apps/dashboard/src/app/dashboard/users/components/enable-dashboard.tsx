import { Label, SwitchContainer } from "@/components/ui";
import { access } from "@/core/modules/users";
import SwitchDashboard from "./switch-dashboard";

export default function EnableDashboard({
	isAdmin,
	enabledDashboard,
	_id,
}: {
	isAdmin: boolean;
	enabledDashboard: boolean;
	_id: string;
}) {
	const dispatch = access.updateDashboardAccess.bind(
		null,
		_id,
		enabledDashboard,
	);

	return (
		<form action={dispatch}>
			<SwitchContainer>
				<SwitchDashboard
					isAdmin={isAdmin}
					enabledDashboard={enabledDashboard}
				/>
				<Label htmlFor="dashboard-enabled">Habilitar acceso</Label>
			</SwitchContainer>
		</form>
	);
}
