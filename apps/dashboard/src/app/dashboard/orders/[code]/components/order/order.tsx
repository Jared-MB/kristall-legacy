"use client";

import Divider from "@/components/divider";
import {
	Button,
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardSubtitle,
	CardTitle,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	Item,
	ItemTitle,
	ItemValue,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { ORDER_STATUS } from "@/constants/permissions";
import type { Order as OrderType } from "@/core/modules/orders/interfaces";
import { format } from "@formkit/tempo";
import { AlignRight, Printer, ShoppingBasket } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import StatusIcon from "../../../../components/status-icon";
import { updateOrderStatus } from "./_adapters";

const orderStatus = [
	"received",
	"preparing",
	"delivering",
	"ready",
	"completed",
];

export default function Order({
	order,
}: {
	order: OrderType;
}) {
	const [label, setLabel] = useState(order.status);
	const [open, setOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	// use font-sans variable for fonts to use Quicksand
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: `
            * {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
        `,
		onBeforePrint: () => {
			document.title = `Pedido ${order.code}`;
		},
		onAfterPrint: () => {
			document.title = "Kristall";
		},
	});

	const handleUpdateStatus = async (value: any) => {
		const prevState = label;
		setLabel(value);
		const error = await updateOrderStatus(order._id, value);
		if (error) {
			setLabel(prevState);
			toast.error(error);
		} else {
			toast.success("Estatus actualizado");
			setOpen(false);
		}
	};

	return (
		<Card ref={ref}>
			<CardHeader className="flex-row justify-between items-start ">
				<div className="flex flex-col gap-y-1">
					<CardTitle>{order.code}</CardTitle>
					<div className="flex items-center gap-x-2">
						<CardDescription>
							<span className="flex gap-x-2 items-center">
								<StatusIcon status={label} />
								{(ORDER_STATUS as any)[label]}
							</span>
						</CardDescription>
						-
						<CardDescription>
							{format(order.date, "DD/MM/YYYY", "es")}
						</CardDescription>
					</div>
				</div>
				<DropdownMenu open={open} onOpenChange={setOpen}>
					<DropdownMenuTrigger asChild className="print:hidden">
						<Button size="icon" variant="outline">
							<AlignRight />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuLabel>Acciones</DropdownMenuLabel>
							<DropdownMenuItem
								className="flex w-full gap-x-2 items-center"
								onClick={handlePrint}
							>
								<Printer />
								Imprimir
							</DropdownMenuItem>
							{/* <DropdownMenuItem className="flex w-full gap-x-2 items-center">
								<HandCoins />
								Liquidar pedido
							</DropdownMenuItem> */}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className="flex flex-row gap-x-2 items-center">
								<StatusIcon status={label as any} />
								Editar estatus
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent className="p-0">
								<Command>
									<CommandInput placeholder="Estatus..." autoFocus={true} />
									<CommandList>
										<CommandEmpty>No status found...</CommandEmpty>
										<CommandGroup>
											{orderStatus.map((label) => (
												<CommandItem
													key={label}
													value={label}
													onSelect={handleUpdateStatus}
													className="flex items-center gap-x-2"
												>
													<StatusIcon status={label as any} />
													{(ORDER_STATUS as any)[label]}
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuLabel>Precaución</DropdownMenuLabel>
							<DropdownMenuItem className="flex w-full gap-x-2 items-center">
								<div className="relative">
									<ShoppingBasket />
									<div className="absolute w-[calc(100%+4px)] h-[2px] -left-[2px] top-[50%] bg-destructive -rotate-45" />
								</div>
								Cancelar pedido
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>
			<Divider />
			<div className="grid grid-cols-[1fr_1px_40%]">
				<CardBody>
					<CardSubtitle>General</CardSubtitle>
					<Item>
						<ItemTitle>Secreto</ItemTitle>
						<ItemValue>{order?.secret ?? "No secret"}</ItemValue>
					</Item>
					<Item>
						<ItemTitle>Cliente</ItemTitle>
						<ItemValue>{order.client.name}</ItemValue>
					</Item>
					<Item>
						<ItemTitle>Total</ItemTitle>
						<ItemValue>${order.payment.total}</ItemValue>
					</Item>
				</CardBody>
				<Divider orientation="vertical" />
				<CardBody>
					<CardSubtitle>Pago</CardSubtitle>
					<Item>
						<ItemTitle>Método de pago</ItemTitle>
						<ItemValue>{order.payment.paymentMethod}</ItemValue>
					</Item>
					{order.payment.paymentMethod === "transfer" && (
						<Item>
							<ItemTitle>Cuenta de banco</ItemTitle>
							<ItemValue>{order.payment.account}</ItemValue>
						</Item>
					)}
					<Item>
						<ItemTitle>Adelanto</ItemTitle>
						<ItemValue>${order.payment.advance}</ItemValue>
					</Item>
					<Item>
						<ItemTitle>Pago pendiente</ItemTitle>
						<ItemValue
							className={order.status === "completed" ? "line-through" : ""}
						>
							${order.payment.pendingPayment}
						</ItemValue>
					</Item>
				</CardBody>
			</div>
			<Divider />
			<CardBody>
				<Table>
					<TableCaption>Productos</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="print:hidden">Código</TableHead>
							<TableHead>Producto</TableHead>
							<TableHead className="text-center">Cantidad</TableHead>
							<TableHead className="text-center">Precio</TableHead>
							<TableHead className="text-center">Subtotal</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{order.products.map((product) => (
							<TableRow key={product._id}>
								<TableCell className="print:hidden">{product.code}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell className="text-center">
									{product.quantity}
								</TableCell>
								<TableCell className="text-center">${product.price}</TableCell>
								<TableCell className="text-center">${product.total}</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell className="print:hidden" />
							<TableCell />
							<TableCell />
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
