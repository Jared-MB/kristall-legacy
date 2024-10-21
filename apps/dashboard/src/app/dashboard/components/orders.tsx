import OrdersTable from "@/components/orders/table";

import { orders } from "@kristall/core/modules/orders";

export default async function DashboardOrders() {
	const latestOrders = await orders.getLatestOrders();

	return <OrdersTable orders={latestOrders} />;
}
