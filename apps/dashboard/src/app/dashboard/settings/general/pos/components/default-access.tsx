import { Label, Switch, SwitchContainer } from "@/components/ui";
import {
	getDefaultPOSAccessEnabled,
	updateDefaultPOSAccessEnabled,
} from "@/core/modules/settings";

export default async function DefaultAccess() {
	const { defaultPOSAccessEnabled } = await getDefaultPOSAccessEnabled();

	return (
		<form action={updateDefaultPOSAccessEnabled}>
			<SwitchContainer>
				<Switch
					defaultChecked={defaultPOSAccessEnabled}
					id="default_batches"
					type="submit"
				/>
				<Label htmlFor="default_pos_access">Habilitado</Label>
			</SwitchContainer>
		</form>
	);
}
