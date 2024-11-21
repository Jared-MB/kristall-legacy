import { vi } from "vitest";

import { randomUUID } from "node:crypto";
import type { Order } from "../interfaces";
import { getLatestOrdersService, getPendingOrdersService } from "../services";
import { orders } from "./index";

vi.mock("../services", () => ({
	getLatestOrdersService: vi.fn(),
	getPendingOrdersService: vi.fn(),
}));

describe("Latest Orders Adapter", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Should return an empty array if there are no orders", async () => {
		vi.mocked(getLatestOrdersService).mockResolvedValue({
			data: [],
			message: "Success",
			status: 200,
		});

		await expect(orders.getLatestOrders()).resolves.toEqual([]);
	});

	test("Should return the orders", async () => {
		const order: Order = {
			_id: randomUUID(),
			code: "123456",
			date: new Date(),
			payment: {
				total: 100,
			},
			status: "received",
		};

		vi.mocked(getLatestOrdersService).mockResolvedValue({
			data: [order],
			message: "Success",
			status: 200,
		});

		await expect(orders.getLatestOrders()).resolves.toEqual([order]);
	});

	test("Should return null if something goes wrong", async () => {
		vi.mocked(getLatestOrdersService).mockResolvedValue({
			data: null,
			message: "Error",
			status: 400,
		});

		await expect(orders.getLatestOrders()).resolves.toBeNull();
	});
});

describe("Pending Orders Adapter", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Should return the orders", async () => {
		const pendingOrders = 10;

		vi.mocked(getPendingOrdersService).mockResolvedValue({
			data: pendingOrders,
			message: "Success",
			status: 200,
		});

		await expect(orders.getPendingOrders()).resolves.toEqual(pendingOrders);
	});

	test("Should return null if something goes wrong", async () => {
		vi.mocked(getPendingOrdersService).mockResolvedValue({
			data: null,
			message: "Error",
			status: 400,
		});

		await expect(orders.getPendingOrders()).resolves.toBeNull();
	});
});
