import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardSubtitle,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item, ItemTitle, ItemValue } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ORDER_STATUS } from "@/core/constants/order-status";
import { getOrderByCode } from "@/core/modules/orders";
import { cn } from "@/core/utils";
import { format } from "@formkit/tempo";
import { AlignRight, ShoppingBasket } from "lucide-react";
import StatusIcon from "../components/status-icon";
import { OrderProgressDesktop } from "./components/order-progress";
import SecretForm from "./components/secret";

export default async function OrderPage(
    props: {
        params: Promise<{
            code: string;
        }>;
    }
) {
    const params = await props.params;
    const order = await getOrderByCode(params.code);

    return (
		<Card>
			<CardHeader className="flex-row justify-between items-start ">
				<div className="flex flex-col gap-y-1">
					<CardTitle>{order.code}</CardTitle>
					<div className="flex items-center gap-x-2">
						<CardDescription>
							<span className="flex gap-x-2 items-center">
								<StatusIcon status={order.status} />
								{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
								{(ORDER_STATUS as any)[order.status]}
							</span>
						</CardDescription>
						-
						<CardDescription>
							{format(order.date, "DD/MM/YYYY", "es")}
						</CardDescription>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild className="print:hidden">
						<Button size="icon" variant="outline">
							<AlignRight />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuLabel>Acciones</DropdownMenuLabel>
							{/* <DropdownMenuItem
                        className="flex w-full gap-x-2 items-center"
                        onClick={handlePrint}
                    >
                        <Printer />
                        Imprimir
                    </DropdownMenuItem> */}
							{/* <DropdownMenuItem className="flex w-full gap-x-2 items-center">
                        <HandCoins />
                        Liquidar pedido
                    </DropdownMenuItem> */}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						{/* <DropdownMenuSub>
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
                </DropdownMenuSub> */}
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
			<Separator />
			<div className="grid grid-cols-[1fr_1px_40%]">
				<CardContent className="pt-6 flex flex-col gap-y-2">
					<CardSubtitle>General</CardSubtitle>
					{/* <Item>
						<ItemTitle>Secreto</ItemTitle>
						<ItemValue>{order?.secret ?? "No secret"}</ItemValue>
					</Item> */}
					<Item>
						<ItemTitle>Cliente</ItemTitle>
						<ItemValue>{order.client.name}</ItemValue>
					</Item>
					<Item>
						<ItemTitle>Total</ItemTitle>
						<ItemValue>${order.payment.total}</ItemValue>
					</Item>
				</CardContent>
				<Separator orientation="vertical" />
				<CardContent className="pt-6 flex flex-col gap-y-2">
					<CardSubtitle>Pago</CardSubtitle>
					<Item>
						<ItemTitle>Método de pago</ItemTitle>
						<ItemValue>{order.payment.paymentMethod}</ItemValue>
					</Item>
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
				</CardContent>
			</div>
			<Separator />
			<CardContent className="p-6">
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
			</CardContent>
			<Separator />
			<CardFooter
				className={cn(
					"pt-6 justify-end",
					order.status !== "ready" && "justify-center py-8 pb-12",
				)}
			>
				{order.status === "ready" ? (
					<SecretForm code={order.code} isReady={order.status === "ready"} />
				) : (
					<OrderProgressDesktop status={order.status} />
				)}
			</CardFooter>
		</Card>
	);
}
