import { getBestSellers } from "@kristall/core/products/get";

import { Card, CardFooter, CardHeader, CardTitle } from "@kristall/ui/card";
import { Chart } from "./chart";

export async function ProductsChart() {
	const bestSellers = await getBestSellers();

	if (!bestSellers) {
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

export function ProductsChartSkeleton() {
	return (
		<Card className="w-full h-full flex flex-col justify-between">
			<div className="flex flex-col justify-evenly grow">
				<CardHeader className="items-center pb-0">
					<CardTitle>Productos más vendidos</CardTitle>
				</CardHeader>
				<div>
					<Chart products={[]} />
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
