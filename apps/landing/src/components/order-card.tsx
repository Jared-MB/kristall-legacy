import { ORDER_STATUS } from "@/constants";
import { cn } from "@/lib/utils";
import { Order } from "@/types/Order";
import { format } from "@formkit/tempo";
import StatusIcon from "./status-icon";
import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardSubtitle,
	CardTitle,
} from "./ui/card";
import Divider from "./ui/divider";
import { Item, ItemTitle, ItemValue } from "./ui/item";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

export default function OrderCard({
	order,
	className,
}: { order: Order; className?: string }) {
	return (
		<Card className={cn("mt-12", className)}>
			<CardHeader className="flex-row justify-between items-start ">
				<div className="flex flex-col gap-y-1">
					<CardTitle>{order.code}</CardTitle>
					<div className="flex items-center gap-x-2">
						<CardDescription>
							<span className="flex gap-x-2 items-center">
								<StatusIcon status={order.status} />
								{(ORDER_STATUS as any)[order.status]}
							</span>
						</CardDescription>
						-
						<CardDescription>
							{format(order.date, "DD/MM/YYYY", "es")}
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<Divider />
			<div className="grid grid-cols-1 md:grid-cols-[1fr_1px_40%]">
				<CardBody>
					<CardSubtitle>General</CardSubtitle>
					<div className="grid grid-cols-2 md:flex flex-col gap-2">
						<Item>
							<ItemTitle>Pago pendiente</ItemTitle>
							<ItemValue
								className={order.status === "completed" ? "line-through" : ""}
							>
								${order.payment.pendingPayment}
							</ItemValue>
						</Item>
						<Item>
							<ItemTitle>Total</ItemTitle>
							<ItemValue>${order.payment.total}</ItemValue>
						</Item>
					</div>
				</CardBody>
				<Divider className="hidden md:block" orientation="vertical" />
				<Divider className="md:hidden" />
				<CardBody>
					<CardSubtitle>Pago</CardSubtitle>
					<div className="grid grid-cols-2 md:flex flex-col gap-2">
						<Item>
							<ItemTitle>Método de pago</ItemTitle>
							<ItemValue>{order.payment.paymentMethod}</ItemValue>
						</Item>
						<Item>
							<ItemTitle>Adelanto</ItemTitle>
							<ItemValue>${order.payment.advance}</ItemValue>
						</Item>
					</div>
				</CardBody>
			</div>
			<Divider />
			<CardBody>
				<Table>
					<TableCaption>Productos</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Producto</TableHead>
							<TableHead className="text-center">Cantidad</TableHead>
							<TableHead className="text-center hidden md:table-cell">
								Precio
							</TableHead>
							<TableHead className="text-center">Subtotal</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{order.products.map((product) => (
							<TableRow key={product._id}>
								<TableCell>{product.name}</TableCell>
								<TableCell className="text-center">
									{product.quantity}
								</TableCell>
								<TableCell className="text-center hidden md:table-cell">
									${product.price}
								</TableCell>
								<TableCell className="text-center">${product.total}</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell />
							<TableCell className="hidden md:table-cell" />
							<TableCell className="text-center">Total</TableCell>
							<TableCell className="text-center">
								${order.payment.total}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</CardBody>
		</Card>
	);
}
