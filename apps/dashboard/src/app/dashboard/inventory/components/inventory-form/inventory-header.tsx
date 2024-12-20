import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@kristall/ui/card";

export function InventoryHeader({ productName }: { productName?: string }) {
	return (
		<Card variant="container" className="mb-4">
			<CardHeader className="p-0">
				<CardTitle>{productName ?? "Agregar producto"}</CardTitle>
				<CardDescription>
					{!productName &&
						"Completa los campos para agregar un nuevo producto a tu inventario."}
					Los campos marcados con * son obligatorios
				</CardDescription>
			</CardHeader>
		</Card>
	);
}
