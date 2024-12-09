import type { OrderStatus } from "@kristall/core/modules/orders/interfaces";

import { ORDER_STATUS } from "@kristall/core/modules/orders/constants";
import OrdersTable from "@kristall/ui/compound/orders/table/orders-table";
import { SearchSelect } from "@kristall/ui/functional/search-select";
import OrderStatusIcon from "@kristall/ui/icons/order-status-icon";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@kristall/ui/select";

import { MenuLink } from "@/components/nav-link";
import Search from "@/components/search";
import TablePagination from "@/components/table-pagination";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter, MoreVertical, PackagePlus } from "lucide-react";
import { cookies } from "next/headers";
import PrintOrders from "./components/print-orders";

import { InputContainer, Label } from "@/components/ui";
import { getOrders } from "./_adapters";

export default async function OrdersPage(props: {
	searchParams: Promise<URLSearchParams>;
}) {
	const searchParams = await props.searchParams;
	const { entities: orders, page, totalPages } = await getOrders(searchParams);
	const cookie = (await cookies()).get("session");

	if (!orders) return <div>Error al cargar los pedidos</div>;

	return (
		<main className="p-8 h-layout overflow-y-auto">
			<header className="mb-4 grid grid-cols-[auto_auto]">
				<h3 className="text-2xl">Pedidos</h3>
				<div className="place flex items-end justify-end gap-x-4">
					<InputContainer className="max-w-56">
						<Label>Buscar código</Label>
						<Search
							placeholder="Buscar código..."
							showLabel={false}
							queryName="code"
						/>
					</InputContainer>
					<InputContainer className="max-w-56">
						<Label>Filtrar por estatus</Label>
						<SearchSelect defaultValue="all" name="status" clearOnValue="all">
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Filtrar por estatus" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">
									<div className="flex items-center gap-x-2">
										<ListFilter />
										Todos
									</div>
								</SelectItem>
								{Object.entries(ORDER_STATUS).map(([key, value]) => (
									<SelectItem key={key} value={key}>
										<div className="flex items-center gap-x-2">
											<OrderStatusIcon status={key as OrderStatus} />
											{value}
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</SearchSelect>
					</InputContainer>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="icon" variant="outline">
								<MoreVertical />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Opciones</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<MenuLink href="/dashboard/orders/add" icon={<PackagePlus />}>
									Nuevo pedido
								</MenuLink>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<PrintOrders cookie={cookie?.value ?? ""} />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<section>
				<OrdersTable orders={orders} />
				<TablePagination page={page} totalPages={totalPages} />
			</section>
		</main>
	);
}
