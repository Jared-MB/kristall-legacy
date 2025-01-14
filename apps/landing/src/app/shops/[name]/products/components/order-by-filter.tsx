import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@kristall/ui/select";
import { OrderBy } from "./order-by";

export function OrderByFilter() {
	return (
		<OrderBy>
			<SelectTrigger className="w-full">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="best-sellers">Más vendidos</SelectItem>
				<SelectItem value="price-lower">Precio: menor a mayor</SelectItem>
				<SelectItem value="price-higher">Precio: mayor a menor</SelectItem>
				<SelectItem value="newest">Más nuevos</SelectItem>
			</SelectContent>
		</OrderBy>
	);
}
