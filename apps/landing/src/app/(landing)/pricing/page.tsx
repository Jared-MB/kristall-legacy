import type { Package } from "@/constants";
import Card from "./components/card";

interface StripePackage {
	id: string;
	nickname: Package;
	unit_amount: number;
}

async function getPrices() {
	try {
		const response = await fetch(`${process.env.SERVER_API}/stripe/prices`, {
			method: "GET",
		});
		const res = await response.json();
		const prices = res.data as StripePackage[];
		return prices.sort((a, b) => a.unit_amount - b.unit_amount);
	} catch {
		return [];
	}
}

const basicFeatures = [
	"Gestión de inventario",
	"Control de pedidos",
	"Gestión de clientes",
	"Reporte de ventas",
];
const standardFeatures = [
	...basicFeatures,
	"Punto de ventas",
	"Manejo de ubicaciones",
];
const plusFeatures = [...standardFeatures];

export default async function Page() {
	const prices = await getPrices();

	return (
		<section className="flex flex-col p-4 py-8 pt-16	 gap-12">
			<div className="flex flex-col justify-center items-center lg:gap-4 gap-8">
				<h3 className="text-purple-500 text-4xl text-center md:text-start text-balance">
					¿Listo para unirte a nuestro equipo?
				</h3>
				<p className="text-pretty w-[80dvw] text-center">
					Empieza ahora para acceder a nuestros servicios
				</p>
			</div>
			<div className="flex items-center lg:justify-evenly px-6 flex-col lg:flex-row gap-12 lg:gap-0">
				<Card
					id={prices[0].id}
					nickname={prices[0].nickname.toLowerCase() as Package}
					price={prices[0].unit_amount / 100}
					features={basicFeatures}
				/>
				<Card
					id={prices[1].id}
					recommended
					nickname={prices[1].nickname.toLowerCase() as Package}
					price={prices[1].unit_amount / 100}
					features={standardFeatures}
				/>
				<Card
					id={prices[2].id}
					nickname={prices[2].nickname.toLowerCase() as Package}
					price={prices[2].unit_amount / 100}
					features={plusFeatures}
				/>
			</div>
		</section>
	);
}
