import { orders } from "@kristall/core/modules/orders";
import OrdersTable from "@kristall/ui/compound/orders/table/orders-table";

export default async function DashboardOrders() {
	const latestOrders = await orders.getLatestOrders();

	return <OrdersTable orders={latestOrders} />;
}
