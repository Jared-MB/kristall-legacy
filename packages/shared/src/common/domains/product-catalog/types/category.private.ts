import type { Category } from "./category";

export type PrivateCategory = Omit<Category, "isActive"> & {
	isActive: boolean;
};
