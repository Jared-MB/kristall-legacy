import { products } from "@kristall/core/modules/products";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import Chart from "./chart";

export default async function ProductsChart() {
	const bestSellers = await products.getBestSellers();

	if (!products) {
		return null;
	}

	return (
		<Card className="w-full h-full flex flex-col justify-between">
			<div className="flex flex-col justify-evenly grow">
				<CardHeader className="items-center pb-0">
					<CardTitle>Productos más vendidos</CardTitle>
				</CardHeader>
				<div>
					<Chart products={bestSellers} />
				</div>
			</div>
			<CardFooter className="flex-col gap-2 text-sm">
				{/* <div className="flex items-center gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div> */}
				<div className="leading-none text-muted-foreground">
					Los productos más vendidos de la tienda de todos los tiempos.
				</div>
			</CardFooter>
		</Card>
	);
}
