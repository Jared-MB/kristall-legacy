import Divider from "@/components/divider";
import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardSubtitle,
	CardTitle,
} from "@/components/ui";

import DefaultBatches from "./components/default-batches";

export default function InventorySettingsPage() {
	return (
		<div className="flex flex-col gap-y-6">
			<CardTitle>Inventario</CardTitle>
			<Card>
				<CardHeader>
					<CardTitle>Lotes</CardTitle>
				</CardHeader>
				<Divider />
				<CardBody>
					<CardSubtitle>Lotes por defecto</CardSubtitle>
					<CardDescription>
						Establece los lotes por defecto para tus productos.
					</CardDescription>
					<DefaultBatches />
				</CardBody>
			</Card>
		</div>
	);
}
