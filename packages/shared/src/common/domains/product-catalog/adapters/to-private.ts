import type { Category } from "../types/category";
import type { PrivateCategory } from "../types/category.private";
import type { Product } from "../types/product";
import type { PrivateProduct } from "../types/product.private";

export function adaptToPrivateCategory(category: Category): PrivateCategory {
	return {
		_id: category._id,
		name: category.name,
		count: category.count,
		isActive: Boolean(category.isActive),
	};
}

export function adaptToPrivateProduct(product: Product): PrivateProduct {
	return {
		_id: product._id,
		name: product.name,
		totalSales: product.totalSales,
		price: product.price,
		cost: product.cost,
		code: product.code,
		stock: product.stock,
		createdAt: product.createdAt,
		image: product.image,
		category: product.category,
		locations: product.locations,
		batchEnabled: Boolean(product.batchEnabled),
	};
}
