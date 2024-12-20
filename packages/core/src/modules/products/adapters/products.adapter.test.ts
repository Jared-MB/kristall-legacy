import type { Image, UploadImageConfig } from "../../image/interfaces";
import type { BestSeller } from "../interfaces";

import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { images } from "../../image";
import type { BatchToAdd, LocationToAdd } from "../../locations/interfaces";
import { BEST_SELLERS } from "../constants/products.mock";
import { productsService } from "../services";
import { uploadProduct } from "../upload";
import { products } from "./index";

const { getBestSellers } = products;

vi.mock("next/navigation", () => ({
	redirect: vi.fn(),
}));

vi.mock("next/cache", () => ({
	revalidatePath: vi.fn(),
}));

vi.mock("../services", () => {
	return {
		productsService: {
			getBestSellingProductsService: vi.fn(),
			uploadProductService: vi.fn(),
		},
	};
});

function isBestSeller(obj: unknown): obj is BestSeller {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"_id" in obj &&
		"name" in obj &&
		"totalSales" in obj &&
		typeof obj._id === "string" &&
		typeof obj.name === "string" &&
		typeof obj.totalSales === "number"
	);
}

describe("Best sellers products", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Get best sellers products", async () => {
		vi.mocked(productsService.getBestSellingProductsService).mockResolvedValue({
			data: BEST_SELLERS,
			status: 200,
			message: "Success",
		});

		const bestSellers = await getBestSellers();
		expect(bestSellers).toHaveLength(10);
		expect(bestSellers).not.toBeNull();
		expect(bestSellers?.every(isBestSeller)).toBe(true);
	});

	test("Error getting best sellers products", async () => {
		vi.mocked(productsService.getBestSellingProductsService).mockResolvedValue({
			status: 500,
			message: "Error",
			data: null,
		});

		const bestSellers = await getBestSellers();
		expect(bestSellers).toBeNull();
	});
});

const { uploadImage, deleteImage } = images;

vi.mock("../../image", () => {
	return {
		images: {
			uploadImage: vi.fn(
				async (
					data: FormData,
					config?: UploadImageConfig,
				): Promise<Image | null> => ({
					_id: randomUUID(),
					url: "https://kristall.io/images/product.png",
				}),
			),
			deleteImage: vi.fn(),
		},
	};
});

describe("Upload product", () => {
	const data = new FormData();
	const _prevState = null;
	const locations: LocationToAdd[] = [
		{
			locationId: randomUUID(),
			stock: 10,
		},
	];

	beforeEach(() => {
		data.append("_id", randomUUID());
		data.append("name", "Product 1");
		data.append("code", "123456789");
		data.append("price", "10");
		data.append("cost", "10");
		data.append("category", randomUUID());
		vi.clearAllMocks();
	});

	test("Upload product successfully", async () => {
		vi.mocked(productsService.uploadProductService).mockResolvedValue({
			status: 200,
			message: "Success",
			data: null,
		});

		const batches: BatchToAdd[] = [];
		const isEnabled = false;
		const isCreatingMany = false;

		const response = await uploadProduct(
			locations,
			batches,
			isEnabled,
			isCreatingMany,
			_prevState,
			data,
		);

		expect(response).toEqual({
			success: true,
		});
	});

	test("Should return an array of errors if form data is empty", async () => {
		const locations: LocationToAdd[] = [];
		const batches: BatchToAdd[] = [];
		const isEnabled = false;
		const isCreatingMany = false;

		const response = await uploadProduct(
			locations,
			batches,
			isEnabled,
			isCreatingMany,
			_prevState,
			new FormData(),
		);

		const errors = Object.values(response);
		for (const error of errors) {
			expect(error).toBeInstanceOf(Array);
		}
		expect(response).not.toEqual({
			success: true,
		});
	});

	test("Should return an array of errors if cost or prices is lower than 0", async () => {
		const batches: BatchToAdd[] = [];
		const isEnabled = false;
		const isCreatingMany = false;

		data.set("cost", "-1");
		data.set("price", "-1");

		const response = await uploadProduct(
			locations,
			batches,
			isEnabled,
			isCreatingMany,
			_prevState,
			data,
		);

		const errors = Object.values(response);
		for (const error of errors) {
			expect(error).toBeInstanceOf(Array);
			expect(error[0]).toContain("debe ser mayor a 0");
		}
		expect(response).not.toEqual({
			success: true,
		});
	});

	test("Should return an array of errors if locations are not provided", async () => {
		const batches: BatchToAdd[] = [];
		const isEnabled = false;
		const isCreatingMany = false;

		const response = await uploadProduct(
			[],
			batches,
			isEnabled,
			isCreatingMany,
			_prevState,
			data,
		);

		const errors = Object.values(response);
		for (const error of errors) {
			expect(error).toBeInstanceOf(Array);
			expect(error[0]).toContain("Debes agregar al menos una ubicación");
		}
		expect(response).not.toEqual({
			success: true,
		});
	});

	test("Should return an array if errors if image upload fails", async () => {
		const ERROR_MESSAGE = "La imagen no puede pesar más de 500KB";

		vi.mocked(images.uploadImage).mockRejectedValue(new Error(ERROR_MESSAGE));

		const batches: BatchToAdd[] = [];
		const isEnabled = false;
		const isCreatingMany = false;

		const response = await uploadProduct(
			locations,
			batches,
			isEnabled,
			isCreatingMany,
			_prevState,
			data,
		);

		const entries = Object.entries(response);
		for (const [key, value] of entries) {
			expect(value).toBeInstanceOf(Array);
			if (key === "size") {
				expect(value[0]).toContain(ERROR_MESSAGE);
			} else {
				expect(value[0]).toContain("Error al subir la imagen");
			}
		}

		expect(response).not.toEqual({
			success: true,
		});

		vi.mocked(images.uploadImage).mockResolvedValue(null);
	});

	test("Should return an array of errors if product upload fails", async () => {
		vi.mocked(productsService.uploadProductService).mockResolvedValue({
			status: 400,
			message: "Bad request",
			data: null,
		});

		const batches: BatchToAdd[] = [];
		const isEnabled = false;
		const isCreatingMany = false;

		const response = await uploadProduct(
			locations,
			batches,
			isEnabled,
			isCreatingMany,
			_prevState,
			data,
		);

		const errors = Object.values(response);
		for (const error of errors) {
			expect(error).toBeInstanceOf(Array);
			expect(error[0]).toContain("Error al subir el producto");
		}
		expect(response).not.toEqual({
			success: true,
		});
	});
});
