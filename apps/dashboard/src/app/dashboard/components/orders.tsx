import { getLatestOrders } from "@kristall/core/orders/get";
import OrdersTable from "@kristall/ui/compound/orders/table/orders-table";

export async function DashboardOrders() {
	const latestOrders = await getLatestOrders();

	if (!latestOrders) {
		return null;
	}

	return <OrdersTable orders={latestOrders} />;
}
