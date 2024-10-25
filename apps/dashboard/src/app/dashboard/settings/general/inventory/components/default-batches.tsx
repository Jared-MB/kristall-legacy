import { Label, Switch, SwitchContainer } from "@/components/ui";
import { settings } from "@kristall/core/modules/settings";

export default async function DefaultBatches() {
	const { defaultBatchEnabled } = await settings.getDefaultBatchEnabled();

	return (
		<form action={settings.updateDefaultBatchEnabled}>
			<SwitchContainer>
				<Switch
					defaultChecked={defaultBatchEnabled}
					id="default_batches"
					type="submit"
				/>
				<Label htmlFor="default_batches">Habilitado</Label>
			</SwitchContainer>
		</form>
	);
}
