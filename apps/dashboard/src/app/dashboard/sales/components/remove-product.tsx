"use client";

import { useCartStore } from "@/core/store";
import { X } from "lucide-react";

export default function RemoveProduct({
	productId,
	quantity,
}: { productId: string; quantity: number }) {
	const removeProductQuantity = useCartStore(
		(state) => state.removeProductQuantity,
	);
	const removeProductFromCart = useCartStore(
		(state) => state.removeProductFromCart,
	);

	const handleClick = () => {
		if (quantity > 1) {
			removeProductQuantity(productId);
			return;
		}

		removeProductFromCart(productId);
	};

	return (
		<button type="button" onClick={handleClick}>
			<X className="w-4 h-4 text-rose-400" />
		</button>
	);
}
