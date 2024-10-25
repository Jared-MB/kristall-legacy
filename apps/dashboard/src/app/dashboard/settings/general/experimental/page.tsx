import Divider from "@/components/divider";
import {
	Card,
	CardBody,
	CardDescription,
	CardFooter,
	CardHeader,
	CardSubtitle,
	CardTitle,
	Label,
	Switch,
	SwitchContainer,
} from "@/components/ui";
import { settings } from "@kristall/core/modules/settings";

export default async function ExperimentalSettingsPage() {
	const { useExperimentalFeatures } =
		await settings.getUseExperimentalFeatures();

	return (
		<div className="flex flex-col gap-y-6">
			<CardTitle>Experimental Features</CardTitle>
			<Card variant="destructive">
				<CardHeader>
					<CardTitle>Versión de prueba</CardTitle>
				</CardHeader>
				<Divider className="border-destructive" />
				<CardBody>
					<CardSubtitle>Usar versión de prueba</CardSubtitle>
					<CardDescription>
						Permite usar la última versión en beta o RC (Release Candidate) de
						Kristall. Esto permite a los usuarios experimentar nuevas
						funcionalidades y ayudar a corregir errores.
					</CardDescription>
				</CardBody>
				<CardFooter className="gap-x-8">
					<small className="text-pretty">
						<span className="font-semibold">¡Atención!</span> Esta opción es
						experimental y puede causar errores. Si encuentras algún problema,
						por favor, háznoslo saber.
					</small>
					<form action={settings.updateUseExperimentalFeatures}>
						<SwitchContainer>
							<Label htmlFor="experimental">Habilitar</Label>
							<Switch
								id="experimental"
								type="submit"
								defaultChecked={useExperimentalFeatures}
								className="data-[state=checked]:bg-destructive"
							/>
						</SwitchContainer>
					</form>
				</CardFooter>
			</Card>
		</div>
	);
}
