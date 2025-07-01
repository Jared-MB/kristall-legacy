import { getAllClients } from "@kristall/client/services/user-management/use-cases/private/get-all-clients";

import { Button } from "@kristall/ui/button";
import { Skeleton } from "@kristall/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@kristall/ui/table";

import { MoreVertical } from "lucide-react";

import { SeeMoreMenu } from "./see-more-menu";

import { ClientStatus } from "@kristall/shared/domains/user-management/types";
import { ClientStatusValidator } from "@kristall/shared/domains/user-management/validators/client-status-validator";

export async function ClientsTable({
	searchParams,
}: { searchParams: Promise<Readonly<URLSearchParams>> }) {
	const params = new URLSearchParams(await searchParams);

	const parsedStatus = ClientStatusValidator.safeParse(params.get("status"));
	let status: ClientStatus = ClientStatus.ACTIVE;

	if (parsedStatus.success) {
		status = parsedStatus.data;
	}

	const clients = await getAllClients({ status });

	if (!clients || clients.length === 0)
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
			{clients.map((client) => (
				<TableRow key={client._id}>
					<TableCell>{client.name}</TableCell>
					<TableCell>{client.purchases}</TableCell>
					<TableCell>
						<SeeMoreMenu client={client} />
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
