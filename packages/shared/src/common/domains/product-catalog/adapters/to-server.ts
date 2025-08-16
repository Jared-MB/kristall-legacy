import type { Category } from "../types/category";
import type { PrivateCategory } from "../types/category.private";

export function toServerCategory(
	category: Omit<PrivateCategory, "count">,
): Omit<Category, "count"> {
	return {
		_id: category._id,
		isActive: category.isActive ? 1 : 0,
		name: category.name,
	};
}
