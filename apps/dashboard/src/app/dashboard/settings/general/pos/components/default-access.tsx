import { Label, Switch, SwitchContainer } from "@/components/ui";
import { settings } from "@kristall/core/modules/settings";

export default async function DefaultAccess() {
	const { defaultPOSAccessEnabled } =
		await settings.getDefaultPOSAccessEnabled();

	return (
		<form action={settings.updateDefaultPOSAccessEnabled}>
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
