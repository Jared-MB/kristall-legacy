import { MenuLink } from "@/components/nav-link";
import OrdersTable from "@/components/orders/table";
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
import { MoreVertical, PackagePlus } from "lucide-react";
import { cookies } from "next/headers";
import PrintOrders from "./components/print-orders";

import { getOrders } from "./_adapters";

export default async function OrdersPage({
	searchParams,
}: {
	searchParams: URLSearchParams;
}) {
	const { entities: orders, page, totalPages } = await getOrders(searchParams);
	const cookie = cookies().get("session");

	if (!orders) return <div>Error al cargar los pedidos</div>;

	return (
		<main className="p-8 h-layout overflow-y-auto">
			<header className="mb-4 grid grid-cols-2">
				<h3 className="text-2xl">Pedidos</h3>
				<div className="place flex items-end justify-end gap-x-4">
					<Search
						placeholder="Buscar código..."
						showLabel={false}
						queryName="code"
					/>
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
