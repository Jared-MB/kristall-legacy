import { Button } from "@kristall/ui/button";
import Link from "next/link";

export default function Resume() {
	return (
		<section className="max-w-2xl flex flex-col mx-auto">
			<h3 className="font-semibold text-sm text-center  italic  text-purple-500">
				Creado para pequeños negocios y emprendedores
			</h3>
			<h2 className="text-5xl font-medium text-center pt-4">
				El punto de ventas ideal para tu negocio.
			</h2>
			<p className="text-zinc-400 w-full text-center py-10">
				Kristall es una servicio que te permite gestionar tu inventario, pedidos
				y ventas de forma sencilla, rápida y en cualquier lugar.
			</p>
			<div className="flex justify-center w-full mt-8 lg:mt-0">
				<Button asChild>
					<Link href="/pricing">Inicia ahora</Link>
				</Button>
			</div>
		</section>
	);
}
