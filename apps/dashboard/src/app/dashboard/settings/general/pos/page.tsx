import Divider from "@/components/divider";
import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardSubtitle,
	CardTitle,
} from "@/components/ui";
import DefaultAccess from "./components/default-access";

export default async function POSSettingsPage() {
	return (
		<div className="flex flex-col gap-y-6">
			<CardTitle>Punto de Ventas</CardTitle>
			<Card>
				<CardHeader>
					<CardTitle>Acceso</CardTitle>
				</CardHeader>
				<Divider />
				<CardBody id="default-access">
					<CardSubtitle>Punto de Ventas por defecto</CardSubtitle>
					<CardDescription>
						Da acceso a tu punto de ventas por defecto a todos los usuarios.
					</CardDescription>
					<DefaultAccess />
				</CardBody>
			</Card>
		</div>
	);
}
