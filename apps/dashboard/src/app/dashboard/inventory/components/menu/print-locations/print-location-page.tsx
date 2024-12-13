import type { Product } from "@kristall/core/interfaces/products";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { format } from "@formkit/tempo";
import { getShopData } from "@kristall/core/shop/data";
import { useQuery } from "@tanstack/react-query";
import { forwardRef } from "react";

const PrintLocationPage = forwardRef<
	HTMLDivElement,
	{
		products: Pick<Product, "_id" | "name" | "price" | "stock">[];
		locationName: string;
	}
>(({ products, locationName }, ref) => {
	const { data } = useQuery({
		queryKey: ["shop"],
		queryFn: async () => await getShopData(),
	});

	return (
		<main ref={ref} className="hidden print:block m-8">
			<header className="flex flex-row justify-between items-center">
				<h1 className="text-4xl mb-8">
					{data?.shopName} - {locationName}
				</h1>
				<span className="capitalize">
					{format(new Date(), { date: "full" })}
				</span>
			</header>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-purple-500">Nombre</TableHead>
						<TableHead className="text-purple-500">Precio</TableHead>
						<TableHead className="text-purple-500 text-center">Stock</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product) => (
						<TableRow key={product._id}>
							<TableCell>{product.name}</TableCell>
							<TableCell>${product.price}</TableCell>
							<TableCell className="text-center">{product.stock}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</main>
	);
});

export default PrintLocationPage;
