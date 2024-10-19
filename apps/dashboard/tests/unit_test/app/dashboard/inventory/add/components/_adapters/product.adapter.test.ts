import { randomUUID } from "node:crypto";
import { type Mock, beforeAll, describe, expect, it, vi } from "vitest";

import { uploadProduct } from "@/app/dashboard/inventory/add/components/_adapters";

import type { BatchToAdd, LocationToAdd } from "@/core/interfaces/entities";
import { getCookie } from "@/core/utils/cookies";

vi.mock("@/core/utils/cookies", () => ({
	getCookie: vi.fn(),
}));

describe("Product Adapter Failing Tests", () => {
	beforeAll(() => {
		(getCookie as Mock).mockReturnValue(
			(async () => process.env.TEST_COOKIE)(),
		);
	});

	it("Should return a message if product name is missing", async () => {
		const response = await uploadProduct([], [], false, {}, new FormData());
		expect(response).toEqual({
			name: ["Required"],
			locations: ["Debes agregar al menos una ubicación"],
		});
	});

	it("Should return a message if product code is missing or is wrong", async () => {
		const payload = new FormData();
		payload.append("name", "Product Name");

		const response = await uploadProduct([], [], false, {}, payload);
		expect(response).toEqual({
			code: ["Expected number, received nan"],
			locations: ["Debes agregar al menos una ubicación"],
		});

		payload.append("code", "as");
		const response2 = await uploadProduct([], [], false, {}, payload);
		expect(response2).toEqual({
			code: ["Expected number, received nan"],
			locations: ["Debes agregar al menos una ubicación"],
		});
	});

	it("Should return a message if product price is missing or is wrong", async () => {
		const payload = new FormData();
		payload.append("name", "Product Name");
		payload.append("code", "123");

		const response = await uploadProduct([], [], false, {}, payload);
		expect(response).toEqual({
			price: ["Expected number, received nan"],
			locations: ["Debes agregar al menos una ubicación"],
		});

		payload.append("price", "0");
		const response2 = await uploadProduct([], [], false, {}, payload);
		expect(response2).toEqual({
			price: ["El precio debe ser mayor a 0", "El precio es requerido"],
			locations: ["Debes agregar al menos una ubicación"],
		});
	});

	it("Should return a message if product cost is missing or is wrong", async () => {
		const payload = new FormData();
		payload.append("name", "Product Name");
		payload.append("code", "123");
		payload.append("price", "123");

		const response = await uploadProduct([], [], false, {}, payload);
		expect(response).toEqual({
			cost: ["Expected number, received nan"],
			locations: ["Debes agregar al menos una ubicación"],
		});

		payload.append("cost", "-1");
		const response2 = await uploadProduct([], [], false, {}, payload);
		expect(response2).toEqual({
			cost: ["Number must be greater than or equal to 0"],
			locations: ["Debes agregar al menos una ubicación"],
		});

		payload.set("cost", "ax");
		const response3 = await uploadProduct([], [], false, {}, payload);
		expect(response3).toEqual({
			cost: ["Expected number, received nan"],
			locations: ["Debes agregar al menos una ubicación"],
		});
	});

	it("Should return a message if product locations are missing", async () => {
		const payload = new FormData();
		payload.append("name", "Product Name");
		payload.append("code", "123");
		payload.append("price", "123");
		payload.append("cost", "123");

		const locations: LocationToAdd[] = [];

		const response = await uploadProduct(locations, [], false, {}, payload);
		expect(response).toEqual({
			locations: ["Debes agregar al menos una ubicación"],
		});
	});

	it("Should return a message if product locations are wrong", async () => {
		const payload = new FormData();
		payload.append("name", "Product Name");
		payload.append("code", "123");
		payload.append("price", "123");
		payload.append("cost", "123");

		let locations: LocationToAdd[] = [
			{
				locationId: "123",
				stock: -1,
			},
		];

		const response = await uploadProduct(locations, [], false, {}, payload);
		expect(response).toEqual({
			locations: ["Invalid uuid", "Number must be greater than or equal to 0"],
		});

		const id = randomUUID();

		locations = [
			{
				locationId: id,
				stock: -1,
			},
		];

		const response2 = await uploadProduct(locations, [], false, {}, payload);
		expect(response2).toEqual({
			locations: ["Number must be greater than or equal to 0"],
		});
	});

	it("Should return a message if product batches are wrong", async () => {
		const payload = new FormData();
		payload.append("name", "Product Name");
		payload.append("code", "123");
		payload.append("price", "123");
		payload.append("cost", "123");

		const locations: LocationToAdd[] = [
			{
				locationId: randomUUID(),
				stock: 1,
			},
		];

		let batches: BatchToAdd[] = [
			{
				expirationDate: new Date(),
				locationProduct: {
					locationId: "123",
					stock: -1,
				},
				batchNumber: -1,
				stock: -1,
			},
		];

		const response = await uploadProduct(
			locations,
			batches,
			false,
			{},
			payload,
		);
		expect(response).toEqual({
			batches: [
				"Invalid uuid",
				"Number must be greater than or equal to 0",
				"Number must be greater than or equal to 0",
				"Number must be greater than or equal to 0",
			],
		});

		const id = randomUUID();
		batches = [
			{
				expirationDate: new Date(),
				locationProduct: {
					locationId: id,
					stock: -1,
				},
				batchNumber: -1,
				stock: -1,
			},
		];

		const response2 = await uploadProduct(
			locations,
			batches,
			false,
			{},
			payload,
		);
		expect(response2).toEqual({
			batches: [
				"Number must be greater than or equal to 0",
				"Number must be greater than or equal to 0",
				"Number must be greater than or equal to 0",
			],
		});

		batches = [
			{
				expirationDate: new Date(),
				locationProduct: {
					locationId: id,
					stock: 1,
				},
				batchNumber: -1,
				stock: 1,
			},
		];

		const response3 = await uploadProduct(
			locations,
			batches,
			false,
			{},
			payload,
		);
		expect(response3).toEqual({
			batches: ["Number must be greater than or equal to 0"],
		});
	});
});
