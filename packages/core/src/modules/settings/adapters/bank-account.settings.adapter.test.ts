import { vi } from "vitest";

import { bankAccountSettingsService } from "../services";
import { bankAccountSettings } from "./index";

const {
	getEnableBankAccountService,
	getRemoveBankAccountService,
	updateEnableBankAccountService,
	updateRemoveBankAccountService,
} = bankAccountSettingsService;

vi.mock("next/cache", () => ({
	revalidateTag: vi.fn(),
}));

vi.mock("../services", () => ({
	bankAccountSettingsService: {
		getEnableBankAccountService: vi.fn(),
		getRemoveBankAccountService: vi.fn(),
		updateEnableBankAccountService: vi.fn(),
		updateRemoveBankAccountService: vi.fn(),
	},
}));

describe("Get bank account settings enable", () => {
	test("Get true if enabled", async () => {
		vi.mocked(getEnableBankAccountService).mockResolvedValue({
			status: 200,
			message: "Success",
			data: {
				enableBankAccounts: true,
			},
		});

		await expect(
			bankAccountSettings.getEnableBankAccountSettings(),
		).resolves.toBe(true);
	});

	test("Get false if disabled", async () => {
		vi.mocked(getEnableBankAccountService).mockResolvedValue({
			status: 200,
			message: "Success",
			data: {
				enableBankAccounts: false,
			},
		});

		await expect(
			bankAccountSettings.getEnableBankAccountSettings(),
		).resolves.toBe(false);
	});

	test("Get false if error", async () => {
		vi.mocked(getEnableBankAccountService).mockResolvedValue({
			status: 500,
			message: "Error",
			data: {
				enableBankAccounts: false,
			},
		});

		await expect(
			bankAccountSettings.getEnableBankAccountSettings(),
		).resolves.toBe(false);
	});
});

describe("Get bank account settings remove", () => {
	test("Get true if enabled", async () => {
		vi.mocked(getRemoveBankAccountService).mockResolvedValue({
			status: 200,
			message: "Success",
			data: {
				removeBankAccounts: true,
			},
		});

		await expect(
			bankAccountSettings.getRemoveBankAccountSettings(),
		).resolves.toBe(true);
	});

	test("Get false if disabled", async () => {
		vi.mocked(getRemoveBankAccountService).mockResolvedValue({
			status: 200,
			message: "Success",
			data: {
				removeBankAccounts: false,
			},
		});

		await expect(
			bankAccountSettings.getRemoveBankAccountSettings(),
		).resolves.toBe(false);
	});

	test("Get false if error", async () => {
		vi.mocked(getRemoveBankAccountService).mockResolvedValue({
			status: 500,
			message: "Error",
			data: {
				removeBankAccounts: false,
			},
		});

		await expect(
			bankAccountSettings.getRemoveBankAccountSettings(),
		).resolves.toBe(false);
	});
});

describe("Update bank account settings enable", () => {
	test("Update true if enabled", async () => {
		vi.mocked(updateEnableBankAccountService).mockResolvedValue({
			status: 200,
			message: "Success",
			data: {
				enableBankAccounts: true,
			},
		});

		await expect(
			bankAccountSettings.updateEnableBankAccountSettings(),
		).resolves.toBeUndefined();
	});

	test("Update false if disabled", async () => {
		vi.mocked(updateEnableBankAccountService).mockResolvedValue({
			status: 200,
			message: "Success",
			data: {
				enableBankAccounts: false,
			},
		});

		await expect(
			bankAccountSettings.updateEnableBankAccountSettings(),
		).resolves.toBeUndefined();
	});

	test("Update false if error", async () => {
		vi.mocked(updateEnableBankAccountService).mockResolvedValue({
			status: 500,
			message: "Error",
			data: {
				enableBankAccounts: false,
			},
		});

		await expect(
			bankAccountSettings.updateEnableBankAccountSettings(),
		).resolves.toBeUndefined();
	});
});

describe("Update bank account settings remove", () => {
	test("Update true if enabled", async () => {
		vi.mocked(updateRemoveBankAccountService).mockResolvedValue({
			status: 200,
			message: "Success",
			data: {
				removeBankAccounts: true,
			},
		});

		await expect(
			bankAccountSettings.updateRemoveBankAccountSettings(),
		).resolves.toBeUndefined();
	});

	test("Update false if disabled", async () => {
		vi.mocked(updateRemoveBankAccountService).mockResolvedValue({
			status: 200,
			message: "Success",
			data: {
				removeBankAccounts: false,
			},
		});

		await expect(
			bankAccountSettings.updateRemoveBankAccountSettings(),
		).resolves.toBeUndefined();
	});

	test("Update false if error", async () => {
		vi.mocked(updateRemoveBankAccountService).mockResolvedValue({
			status: 500,
			message: "Error",
			data: {
				removeBankAccounts: false,
			},
		});

		await expect(
			bankAccountSettings.updateRemoveBankAccountSettings(),
		).resolves.toBeUndefined();
	});
});
