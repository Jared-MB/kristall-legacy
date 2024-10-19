import { order as orderModule } from "@/core/modules/orders";
import Order from "./components/order";

export default async function OrderPage({
	params,
}: { params: { code: string } }) {
	const order = await orderModule.getOrderByCode(params.code);

	if (!order) {
		return null;
	}

	return (
		<main className="p-8 h-layout overflow-y-auto">
			<Order order={order} />
		</main>
	);
}
