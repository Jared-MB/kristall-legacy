import { Label, Switch, SwitchContainer } from "@/components/ui";
import { settings } from "@kristall/core/modules/settings";

export default async function SaveForms() {
	const { saveForms } = await settings.getSaveForms();

	return (
		<form action={settings.updateSaveForms}>
			<SwitchContainer>
				<Switch id="save-forms" defaultChecked={saveForms} type="submit" />
				<Label htmlFor="save-forms">Guardar formularios</Label>
			</SwitchContainer>
		</form>
	);
}
