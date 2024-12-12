"use server";

import type { LocationProduct } from "../locations/interfaces";
import { getProductByIdService } from "./services/id";

import { parse } from "@formkit/tempo";

export const getProductById = async (_id: string) => {
	const { data: product } = await getProductByIdService(_id);
	const mappedLocations: LocationProduct[] =
		product?.locations?.map((location) => ({
			...location,
			productBatches:
				location?.productBatches?.map((batch) => {
					return {
						...batch,
						expirationDate: parse(
							batch.expirationDate as unknown as string,
							"YYYY-MM-DD",
						),
					};
				}) ?? undefined,
		})) ?? [];
	if (product) {
		product.locations = mappedLocations;
	}
	return product;
};
