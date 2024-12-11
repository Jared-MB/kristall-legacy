import { Label, Switch, SwitchContainer } from "@/components/ui";
import {
	getSaveFormsConfig,
	updateSaveForms,
} from "@kristall/core/settings/save-forms";

export default async function SaveForms() {
	const { saveForms } = await getSaveFormsConfig();

	return (
		<form action={updateSaveForms}>
			<SwitchContainer>
				<Switch id="save-forms" defaultChecked={saveForms} type="submit" />
				<Label htmlFor="save-forms">Guardar formularios</Label>
			</SwitchContainer>
		</form>
	);
}
