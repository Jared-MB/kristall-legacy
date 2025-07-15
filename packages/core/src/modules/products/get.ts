"use server";

import type { OrderProduct, Product, PublicProduct } from "./interfaces";

import { GET } from "@kristall/nexum";

import type { Pagination } from "@kristall/http/interfaces";
import { paginateURL } from "../../utils/pagination";
import { PRODUCTS_TAGS } from "./constants";

export const getProductsByLocation = async ({
	locationId,
	name,
	take = 16,
}: {
	locationId: string;
	name?: string;
	take?: number;
}): Promise<OrderProduct[] | undefined> => {
	if (!locationId || typeof locationId !== "string") {
		return undefined;
	}

	if (typeof take !== "number") {
		return undefined;
	}

	const searchParams = new URLSearchParams({
		id: locationId,
		take: take.toString(),
	});

	if (name) {
		searchParams.set("name", name);
	}

	const { data } = await GET<OrderProduct[]>(
		`/products/location?${searchParams.toString()}`,
		{
			tags: [
				PRODUCTS_TAGS.BY_LOCATION(locationId, take),
				...(name ? [PRODUCTS_TAGS.SEARCH(name)] : []),
			],
		},
	);

	return data;
};

export const getBestSellers = async (): Promise<
	PublicProduct[] | undefined
> => {
	const { data } = await GET<PublicProduct[]>(
		"/products/best-sellers?take=10&skip=0",
		{
			tags: [PRODUCTS_TAGS.BEST_SELLERS],
			cache: "force-cache",
		},
	);

	return data;
};

export const getPaginatedProducts = async (
	searchParams: Readonly<URLSearchParams>,
): Promise<Pagination<Product>> => {
	const query = paginateURL(searchParams);

	const { data: pagination } = await GET<Pagination<Product>>(
		`/products?${query}`,
		{
			tags: [PRODUCTS_TAGS.PAGINATED],
		},
	);

	return (
		pagination ?? {
			entities: [],
			page: 0,
			totalPages: 0,
			hasMore: false,
			next: null,
			previous: null,
		}
	);
};
