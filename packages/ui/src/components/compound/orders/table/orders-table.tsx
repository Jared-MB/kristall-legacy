import type { Order } from "@kristall/core/modules/orders/interfaces";

import { ORDER_STATUS } from "@kristall/core/modules/orders/constants";
import OrderStatusIcon from "@kristall/ui/icons/order-status-icon";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import OrdersTableDropdown from "./order-dropdown";

import { NotepadText } from "lucide-react";

export default async function OrdersTable({ orders }: { orders: Order[] }) {
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
									<OrderStatusIcon status={order.status} />
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
