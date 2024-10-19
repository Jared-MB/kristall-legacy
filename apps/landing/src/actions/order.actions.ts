"use server";

import { Order } from "@/types/Order";
import { redirect } from "next/navigation";

export const getOrderByCode = async (
	orderCode: string,
): Promise<Order | null> => {
	const response = await fetch(
		`${process.env.SERVER_API}/orders/public/${orderCode}`,
		{
			cache: "no-store",
		},
	);
	const order = await response.json();
	if (order.statusCode > 400 || order.status > 400) {
		return null;
	}
	return order;
};

export const redirectToOrder = async (data: FormData) => {
	const code = data.get("code");
	if (code) {
		redirect(`/track-order/${code}`);
	}
};
