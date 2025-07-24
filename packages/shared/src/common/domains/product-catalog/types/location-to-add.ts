import type { LocationProduct } from "./location-product";

export type LocationToAdd = Pick<LocationProduct, "locationId" | "stock">;
