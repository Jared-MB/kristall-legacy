"use client";

import { usePathname } from "next/navigation";

export default function WelcomeMessage() {
	const path = usePathname();

	if (path.includes("/register")) {
		return <p>Regístrate para comenzar</p>;
	}

	return <p>Bienvenido de vuelta</p>;
}
