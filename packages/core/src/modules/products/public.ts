"use server";

import { paginateURL } from "@kristall/core/utils";
import {
	getPublicBestSellersService,
	getPublicNewProductsService,
	getPublicProductsService,
} from "./services/public";

export const getPublicProducts = async (
	shopName: string,
	searchParams: Readonly<URLSearchParams>,
) => {
	const query = paginateURL(searchParams, 20);
	const { data } = await getPublicProductsService(shopName, query);
	return data;
};

export const getPublicBestSellers = async (virtualShowroomUrl: string) => {
	const virtualShowroomName = virtualShowroomUrl.split("/").pop();
	if (!virtualShowroomName) {
		return [];
	}
	const { data } = await getPublicBestSellersService(virtualShowroomName);
	return data;
};

export const getPublicNewProducts = async (virtualShowroomUrl: string) => {
	const virtualShowroomName = virtualShowroomUrl.split("/").pop();
	if (!virtualShowroomName) {
		return [];
	}
	const { data } = await getPublicNewProductsService(virtualShowroomName);
	return data;
};
