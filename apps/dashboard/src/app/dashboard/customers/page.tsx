import { getCustomers } from "@/actions/customer.actions";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import AddCustomer from "./components/add-customer-form";
import CustomerMenu from "./components/customer-menu";

export default async function CustomersPage() {
	const customers = await getCustomers();

	if (!customers) return <div>Clientes no encontrados</div>;

	return (
		<main className="p-8 h-layout overflow-y-auto">
			<header className="mb-4 flex justify-between items-center">
				<h3 className="text-2xl">Clientes</h3>
				<AddCustomer />
			</header>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nombre</TableHead>
						<TableHead>Compras</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customers?.map((customer) => (
						<TableRow key={customer._id}>
							<TableCell>{customer.name}</TableCell>
							<TableCell>{customer.purchases}</TableCell>
							<TableCell>
								<CustomerMenu customer={customer} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</main>
	);
}
