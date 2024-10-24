"use client";

import { API_REST } from "@/constants";
import { Button } from "@kristall/ui/button";
import axios from "axios";
import { toast } from "react-toastify";

export default function Pay({
	recommended = false,
	id,
}: {
	recommended?: boolean;
	id: string;
}) {
	const handleClick = async () => {
		const { data: response } = await axios.post(
			`${API_REST}/stripe/checkout-session`,
			{
				priceId: id,
			},
		);

		if (response.data) window.location.href = response.data.url;
		else toast.error("Ocurrió un error al procesar tu pago");
	};

	return (
		<Button
			variant={recommended ? "default" : "outline"}
			className={recommended ? "shadow-md" : ""}
			onClick={handleClick}
		>
			Empezar
		</Button>
	);
}
