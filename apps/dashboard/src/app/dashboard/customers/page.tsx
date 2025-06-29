import { Suspense } from "react";

import { Table, TableHead, TableHeader, TableRow } from "@kristall/ui/table";

import { AddClient } from "./components/add-client";
import { ClientsTable, ClientsTableSkeleton } from "./components/clients-table";

export default function ClientsPage() {
	return (
		<main className="p-8 h-layout overflow-y-auto">
			<header className="mb-4 flex justify-between items-center">
				<h3 className="text-2xl">Clientes</h3>
				<AddClient />
			</header>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nombre</TableHead>
						<TableHead>Compras</TableHead>
						<TableHead />
					</TableRow>
				</TableHeader>
				<Suspense fallback={<ClientsTableSkeleton />}>
					<ClientsTable />
				</Suspense>
			</Table>
		</main>
	);
}
