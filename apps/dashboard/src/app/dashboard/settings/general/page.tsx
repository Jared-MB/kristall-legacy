import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardSubtitle,
	CardTitle,
} from "@kristall/ui/card";
import { Separator } from "@kristall/ui/separator";
import { ExperimentalFeature } from "../components/experimental-feature";
import SaveForms from "./components/save-forms";

export default function GeneralSettingsPage() {
	return (
		<div className="flex flex-col gap-y-6">
			<CardTitle>Configuración general</CardTitle>
			<Card>
				<CardHeader>
					<CardTitle>Formularios</CardTitle>
				</CardHeader>
				<Separator />
				<CardBody id="default-access">
					<CardSubtitle className="flex items-center justify-between gap-x-2">
						Guardar formularios <ExperimentalFeature />
					</CardSubtitle>
					<CardDescription>
						Guarda los formularios de cualquier tipo (como añadir productos,
						pedidos, etc.) de formal local en tu navegador. Esto te permite
						continuar los formularios más tarde, por ejemplo, si necesitas salir
						del formulario para revisar algún dato guardado previamente (como el
						nombre de un producto, cliente, etc.) puedas continuar editando el
						formulario desde donde te quedaste.
					</CardDescription>
					<SaveForms />
				</CardBody>
			</Card>
		</div>
	);
}
