"use server";

import { NEXT_TAGS } from "@/constants/tags";
import type { CartProduct } from "@/types/product";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { uploadOrderService } from "../_services";
import { AddOrderSchema } from "../_validators";

export const uploadOrder = async (
	cart: CartProduct[],
	payload: any,
	_prevState: unknown,
) => {
	let cost = 0;

	const mappedCart = cart.map((product) => {
		cost += product.cost ?? 0;

		return {
			...product,
			productId: product._id,
			total: product.price * product.quantity,
		};
	});

	const order = {
		...payload,
		cart: mappedCart,
		cost,
	};

	const parsedOrder = AddOrderSchema.safeParse(order);

	if (!parsedOrder.success) {
		return parsedOrder.error.flatten().fieldErrors;
	}

	try {
		const response = await uploadOrderService(parsedOrder.data);
		console.log(response);
	} catch (err) {
		return {
			message: "Error al crear el pedido",
		};
	}

	revalidateTag(NEXT_TAGS.GET_ORDERS);
	revalidatePath("/dashboard/customers");
	redirect("/dashboard/orders");
};
