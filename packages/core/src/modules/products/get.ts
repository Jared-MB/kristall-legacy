"use server";

import type { Product, PublicProduct } from "./interfaces";

import { GET } from "nexum";

import type { Pagination } from "@kristall/http/interfaces";
import { errorLog } from '../../utils/logs';
import { paginateURL } from "../../utils/pagination";
import { PRODUCTS_TAGS } from "./constants";

export const getProductsByLocation = async (searchParams: Readonly<URLSearchParams>): Promise<Product[] | undefined> => {
	const locationId = searchParams.get('locationId')
	const take = Number(searchParams.get('take') ?? 15)

	if (!locationId){
		errorLog('Location ID is required')
		return undefined
	}
	
	const { data } = await GET<Product[]>(`/products/location?id=${locationId}&take=${take}`, {
		tags: [PRODUCTS_TAGS.BY_LOCATION(locationId, take)],
		cache: "force-cache",
	})

	return data
}

export const getBestSellers = async (): Promise<PublicProduct[] | undefined> => {
	const { data } = await GET<PublicProduct[]>(
		"/products/best-sellers?take=10&skip=0",
		{
			tags: [PRODUCTS_TAGS.BEST_SELLERS],
			cache: "force-cache",
		},
	);

	return data
};

export const getPaginatedProducts = async (
	searchParams: Readonly<URLSearchParams>,
): Promise<Pagination<Product>> => {
	const query = paginateURL(searchParams);

	const {data: pagination} = await GET<Pagination<Product>>(`/products?${query}`, {
		tags: [PRODUCTS_TAGS.PAGINATED],
	});

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
