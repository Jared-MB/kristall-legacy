export const PRODUCT_TAGS = {
	ALL: "product:all",
	PAGINATED: (query: string) => `product:paginated:query:${query}`,
} as const;
