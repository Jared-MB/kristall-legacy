import { getAllClients } from "@kristall/core/clients/all";

import { Button } from "@kristall/ui/button";
import { Skeleton } from "@kristall/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@kristall/ui/table";
import { MoreVertical } from "lucide-react";
import CustomerMenu from "./customer-menu";

export async function ClientsTable() {
	const customers = await getAllClients();

	if (!customers || customers.length === 0)
		return (
			<TableBody>
				<TableRow>
					<TableCell colSpan={3} rowSpan={3} className="text-center">
						No se encontraron clientes
					</TableCell>
				</TableRow>
			</TableBody>
		);

	return (
		<TableBody>
			{customers.map((customer) => (
				<TableRow key={customer._id}>
					<TableCell>{customer.name}</TableCell>
					<TableCell>{customer.purchases}</TableCell>
					<TableCell>
						<CustomerMenu customer={customer} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export function ClientsTableSkeleton() {
	return (
		<TableBody>
			{Array.from({ length: 5 }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: Its a skeleton don't need a sophisticated key
				<TableRow key={i}>
					<TableCell>
						<Skeleton className="w-32 h-4" />
					</TableCell>
					<TableCell>
						<Skeleton className="w-8 h-4" />
					</TableCell>
					<TableCell>
						<Button disabled size="icon" variant="ghost">
							<MoreVertical />
						</Button>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}
