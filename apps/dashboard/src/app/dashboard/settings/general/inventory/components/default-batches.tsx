import { Label, Switch, SwitchContainer } from "@/components/ui";
import {
	getDefaultBatchEnabled,
	updateDefaultBatchEnabled,
} from "@/core/modules/settings";

export default async function DefaultBatches() {
	const { defaultBatchEnabled } = await getDefaultBatchEnabled();

	return (
		<form action={updateDefaultBatchEnabled}>
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
