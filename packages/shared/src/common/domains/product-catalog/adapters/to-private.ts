import type { Product } from "../types/product";
import type { PrivateProduct } from "../types/product.private";

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
