"use client";

import { API_REST } from "@/constants";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { toast } from "react-toastify";

export default function CardButton({
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
			variant={recommended ? "shadow" : "bordered"}
			radius="sm"
			color="primary"
			className={recommended ? "shadow-md" : ""}
			onPress={handleClick}
		>
			Empezar
		</Button>
	);
}
