import { Product } from "@/types";
import { Category } from "@/types/Category";
import axios from "axios";

export class ProductService {
	async getProducts(shopName: string): Promise<Product[] | null> {
		try {
			const response = await axios.get(
				`${process.env.SERVER_API}/shops/public/${shopName}/products?take=20&skip=0`,
			);
			return response.data.data;
		} catch (error) {
			return null;
		}
	}

	async getBestSellers(shopName: string): Promise<Product[] | null> {
		try {
			const response = await axios.get(
				`${process.env.SERVER_API}/shops/public/${shopName}/products/best-sellers?take=10&skip=0`,
			);
			return response.data.data;
		} catch (error) {
			return null;
		}
	}

	async getNewest(shopName: string): Promise<Product[] | null> {
		try {
			const response = await axios.get(
				`${process.env.SERVER_API}/shops/public/${shopName}/products/newest?take=10&skip=0`,
			);
			return response.data.data;
		} catch (error) {
			return null;
		}
	}
}

export class CategoryService {
	async getCategories(shopName: string): Promise<Category[] | null> {
		try {
			const response = await axios.get(
				`${process.env.SERVER_API}/shops/public/${shopName}/categories`,
			);
			return response.data.data;
		} catch (error) {
			return null;
		}
	}
}
