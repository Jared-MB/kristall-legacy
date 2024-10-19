import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ORDER_STATUS } from "@/core/constants/order-status";
import { getOrders } from "@/core/modules/orders/adapters";
import { NotepadText } from "lucide-react";
import OrdersTableDropdown from "./components/orders-table-dropdown";
import StatusIcon from "./components/status-icon";

export default async function OrdersPage({
	searchParams,
}: {
	searchParams: Readonly<URLSearchParams>;
}) {
	const { entities: orders } = await getOrders(searchParams);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Código</TableHead>
					<TableHead className="hidden md:table-cell">Fecha</TableHead>
					<TableHead>Estatus</TableHead>
					<TableHead>Total</TableHead>
					<TableHead />
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.length === 0 ? (
					<TableRow>
						<TableCell colSpan={5} className="text-center">
							<div className="flex items-center justify-center gap-x-2 p-4">
								<NotepadText className="text-zinc-300" />
								Aún no hay pedidos registrados.
							</div>
						</TableCell>
					</TableRow>
				) : (
					orders.map((order) => (
						<TableRow key={order._id}>
							<TableCell>{order.code}</TableCell>
							<TableCell className="hidden md:table-cell">
								{new Date(order.date).toLocaleDateString()}
							</TableCell>
							<TableCell>
								<div className="flex gap-x-2">
									<StatusIcon status={order.status} />
									{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
									{(ORDER_STATUS as any)[order.status]}
								</div>
							</TableCell>
							<TableCell>${order.payment.total}</TableCell>
							<TableCell>
								<OrdersTableDropdown code={order.code} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
