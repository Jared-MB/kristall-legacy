export const ORDER_TAGS = {
	ALL: "ORDERS",
	PAGINATED: (query: string) => `ORDERS_PAGINATED_${query}`,
	LATEST: "ORDERS_LATEST",
	PENDING: "ORDERS_PENDING",
} as const;
