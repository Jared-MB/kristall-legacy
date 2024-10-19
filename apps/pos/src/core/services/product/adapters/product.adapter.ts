"use server";

import type { Pagination } from "@/core/interfaces/pagination";
import type { CatalogProduct, Product } from "../interfaces";

import { paginateURL } from "@/core/utils/pagination";

import { getProductsByLocationService, getProductsService } from "../services";

export const getProducts = async (
	searchParams: Readonly<URLSearchParams>,
): Promise<Pagination<Product>> => {
	const query = paginateURL(searchParams);
	const { data } = await getProductsService(query);
	return data;
};

export const getProductsByLocation = async (
	searchParams: Readonly<URLSearchParams>,
): Promise<CatalogProduct[]> => {
	const search = new URLSearchParams(searchParams).toString();
	if (!search) return [];
	const { data } = await getProductsByLocationService(search);
	return data;
};
