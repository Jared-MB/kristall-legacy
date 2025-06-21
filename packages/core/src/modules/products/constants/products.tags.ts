export const PRODUCTS_TAGS = {
	BEST_SELLERS: "PRODUCTS_BEST_SELLERS",
	PAGINATED: "PRODUCTS_PAGINATED",
	PUBLIC_BEST_SELLERS: "PRODUCTS_PUBLIC_BEST_SELLERS",
	PUBLIC_NEW: "PRODUCTS_PUBLIC_NEW",
	PUBLIC: "PRODUCTS_PUBLIC",
	BY_LOCATION: (location: string, take: number) =>
		`products:location:${location}:take:${take}`,
	SEARCH: (query: string) => `products:search:${query}`,
	PUBLIC_DETAILS: (productId: string) => `PRODUCTS_PUBLIC_DETAILS_${productId}`,
	ID: (productId: string) => `PRODUCTS_ID_${productId}`,
} as const;
