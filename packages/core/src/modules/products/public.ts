"use server";

import { paginateURL } from "@kristall/core/utils";
import { GET } from "@kristall/http";
import { PRODUCTS_TAGS } from "./constants";
import type { PublicProduct } from "./interfaces";
import {
	getPublicBestSellersService,
	getPublicNewProductsService,
	getPublicProductsService,
} from "./services/public";

/**
 * Get all products from a virtual showroom if it is public or exists
 * @param shopName The name of the virtual showroom
 * @param searchParams The search parameters
 * @param take The number of products to take (default: 20)
 */
export const getPublicProducts = async (
	shopName: string,
	searchParams: Readonly<URLSearchParams>,
	take = 20,
) => {
	const query = paginateURL(searchParams, take);
	const { data } = await getPublicProductsService(shopName, query);
	return data;
};

export const getPublicRelatedProducts = async (
	shopName: string,
	productId: string,
	searchParams?: Readonly<URLSearchParams>,
) => {
	const { data } = await GET<PublicProduct[] | null>(
		`/public-products/${shopName}/${productId}/related?${
			searchParams?.toString() ?? ""
		}`,
	);

	return data;
};

export const getPublicProductById = async (
	shopName: string,
	productId: string,
) => {
	const { data } = await GET<PublicProduct | null>(
		`/public-products/${shopName}/${productId}`,
		{
			tags: [PRODUCTS_TAGS.PUBLIC_DETAILS(productId)],
			cache: "no-store",
		},
	);

	return data;
};

export const getPublicBestSellersProducts = async (shopName: string) => {
	const search = new URLSearchParams();
	search.set("sort-by", "best-sellers");

	return await getPublicProducts(shopName, search);
};

export const getPublicNewestProducts = async (shopName: string) => {
	const search = new URLSearchParams();
	search.set("sort-by", "newest");

	return await getPublicProducts(shopName, search);
};

/**
 * @deprecated Use getPublicBestSellersProducts instead
 */
export const getPublicBestSellers = async (virtualShowroomUrl: string) => {
	const virtualShowroomName = virtualShowroomUrl.split("/").pop();
	if (!virtualShowroomName) {
		return [];
	}
	const { data } = await getPublicBestSellersService(virtualShowroomName);
	return data;
};

/**
 * @deprecated Use getPublicNewestProducts instead
 */
export const getPublicNewProducts = async (virtualShowroomUrl: string) => {
	const virtualShowroomName = virtualShowroomUrl.split("/").pop();
	if (!virtualShowroomName) {
		return [];
	}
	const { data } = await getPublicNewProductsService(virtualShowroomName);
	return data;
};
