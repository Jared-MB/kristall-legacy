import type { PublicProduct } from "@kristall/core/interfaces/products";

export const protocol =
	process.env.NODE_ENV === "production" ? "https" : "http";
export const rootDomain =
	process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3006";

export function distributeToColumnsArray(
	products: PublicProduct[],
	totalColumns: number,
): PublicProduct[][] {
	const columns: PublicProduct[][] = Array.from(
		{ length: totalColumns },
		() => [],
	);

	products.forEach((product, index) => {
		columns[index % totalColumns].push(product);
	});

	return columns;
}
