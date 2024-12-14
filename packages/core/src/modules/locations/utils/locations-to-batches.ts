import type { LocationProduct, ProductBatch } from "../interfaces";

export const getBatchesFromLocations = (
	locations: LocationProduct[],
): ProductBatch[] => {
	const batches = locations.flatMap((location) => {
		if (!location.productBatches) return [];
		return location.productBatches;
	});
	return batches;
};
