import { PUT } from "@kristall/http";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { login } from "./login";
import { register } from "./register";

vi.mock("@kristall/http");
vi.mock("./login");

describe("register", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should return field errors if validation fails", async () => {
		const payload = new FormData();
		payload.append("username", "");
		payload.append("password", "");
		payload.append("confirmPassword", "");
		payload.append("email", "");
		payload.append("shopName", "");

		const result = await register(null, payload);

		expect(result).toHaveProperty("fields");
		expect(result?.fields).toHaveProperty("username");
		expect(result?.fields).toHaveProperty("password");
		expect(result?.fields).toHaveProperty("email");
		expect(result?.fields).toHaveProperty("shopName");
		expect(result?.fields).toHaveProperty("confirmPassword");
	});

	it("should return error if passwords do not match", async () => {
		const payload = new FormData();
		payload.append("username", "testuser");
		payload.append("password", "password123");
		payload.append("confirmPassword", "wrongpassword");
		payload.append("email", "test@example.com");
		payload.append("shopName", "Test Shop");

		const result = await register(null, payload);

		expect(result).toHaveProperty("fields");
		expect(result?.fields?.confirmPassword.message).toBe(
			"Las contraseñas no coinciden",
		);
	});

	it("should return error message if registration fails", async () => {
		const payload = new FormData();
		payload.append("username", "testuser");
		payload.append("password", "password123");
		payload.append("confirmPassword", "password123");
		payload.append("email", "test@example.com");
		payload.append("shopName", "Test Shop");

		vi.mocked(PUT).mockResolvedValueOnce({
			data: "error",
			status: 500,
			message: "Internal Server Error",
		});

		const result = await register(null, payload);

		expect(result).toHaveProperty("message");
		expect(result?.message).toBe(
			"Ha ocurrido un error interno, por favor intente de nuevo más tarde",
		);
	});

	it("should call login and return undefined on successful registration", async () => {
		const payload = new FormData();
		payload.append("username", "testuser");
		payload.append("password", "password123");
		payload.append("confirmPassword", "password123");
		payload.append("email", "test@example.com");
		payload.append("shopName", "Test Shop");

		vi.mocked(PUT).mockResolvedValueOnce({
			data: "ok",
			status: 200,
			message: "Success",
		});

		const result = await register(null, payload);

		expect(login).toHaveBeenCalledWith(null, payload);
		expect(result).toBeUndefined();
	});
});
