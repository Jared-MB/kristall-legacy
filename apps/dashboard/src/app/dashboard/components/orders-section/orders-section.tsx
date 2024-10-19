import OrdersTable from "@/components/orders/table";

import { getLatestOrders } from "./_adapters";

export default async function OrdersSection() {
	const orders = await getLatestOrders();

	return (
		<section className="pt-8">
			<h3 className="text-2xl mb-4">Últimos pedidos</h3>
			<OrdersTable orders={orders} />
		</section>
	);
}
