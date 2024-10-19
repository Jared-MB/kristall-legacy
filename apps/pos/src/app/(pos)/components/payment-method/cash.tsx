"use client";

import { Input, InputContainer, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { useMemo, useState } from "react";
import { useErrorsContext } from "../../context/errors.context";
import { useShoppingCartStore } from "../../store/shopping-cart.store";

export default function Cash() {
	const cart = useShoppingCartStore((state) => state.cart);

	const errors = useErrorsContext();

	const total = useMemo(() => {
		return cart.reduce(
			(acc, product) => acc + product.price * product.quantity,
			0,
		);
	}, [cart]);

	const [change, setChange] = useState(-total);

	const [amount, setAmount] = useState(0);

	const calculateChange = (value: number) => {
		setAmount(value);
		setChange(value - total);
	};

	return (
		<>
			<InputContainer>
				<Label htmlFor="amount">Monto</Label>
				<Input
					id="amount"
					name="amount"
					value={amount || ""}
					onChange={(e) => calculateChange(+e.target.value)}
					type="number"
					placeholder="0"
					icon={<DollarSign />}
				/>
				{errors.length > 0 && errors[0].field === "amount" && (
					<InputError>{errors[0].message}</InputError>
				)}
			</InputContainer>
			<div className="grid grid-cols-[1fr_auto] items-center gap-4">
				<div>Cambio</div>
				<div className="font-medium">${change}</div>
			</div>
		</>
	);
}
