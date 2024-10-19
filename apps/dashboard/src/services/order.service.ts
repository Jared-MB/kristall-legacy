import type { ProductOrder } from "@/types/product";
import { ClientServerConnection } from "@/utils/ClientServerConnection";
import { AddOrderSchema } from "@/validator/order.validator";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * @deprecated
 */
export const addOrder = async (
	data: {
		cart: ProductOrder[];
		productsFrom: string;
		client: string;
		location: string;
		paymentMethod: {
			type: "cash" | "card" | "transfer" | "pending";
			account?: string;
		};
		advance: number;
	},
	token: RequestCookie | undefined,
) => {
	let cost = 0;

	const mappedCart = data.cart.map((product) => {
		cost += product.cost ?? 0;

		return {
			...product,
			productId: product._id,
			total: product.price * product.quantity,
			_id: undefined,
		};
	});

	const parsedData = AddOrderSchema.safeParse({
		...data,
		cart: mappedCart,
		cost,
	});
	if (!parsedData.success) {
		console.log(parsedData.error.flatten().fieldErrors);
		return;
	}

	return await new ClientServerConnection("/orders/create-order", token).post(
		parsedData.data,
	);
};
