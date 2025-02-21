import { setCookie } from "@kristall/core/utils/cookies";
import { POST } from "@kristall/http";
import { redirect } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AUTH_COOKIE } from "./constants/auth.constant";
import { login } from "./login";

vi.mock("@kristall/http");
vi.mock("@kristall/core/utils/cookies");
vi.mock("next/navigation");

describe("login", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should return field errors if validation fails", async () => {
		const payload = new FormData();
		payload.append("username", "");
		payload.append("password", "");

		const result = await login(null, payload);

		expect(result).toHaveProperty("fields");
		expect(result?.fields).toHaveProperty("username");
		expect(result?.fields).toHaveProperty("password");
	});

	it("should return error message if login fails with 401 status", async () => {
		const payload = new FormData();
		payload.append("username", "testuser");
		payload.append("password", "wrongpassword");

		vi.mocked(POST).mockResolvedValueOnce({
			data: {},
			status: 401,
			message: "",
		});

		const result = await login(null, payload);

		expect(result).toHaveProperty("fields");
		expect(result?.fields?.username.message).toBe(
			"Usuario o contraseña incorrectos",
		);
		expect(result?.fields?.password.message).toBe(
			"Usuario o contraseña incorrectos",
		);
	});

	it("should return error message if login fails with non-200 status", async () => {
		const payload = new FormData();
		payload.append("username", "testuser");
		payload.append("password", "testpassword");

		vi.mocked(POST).mockResolvedValueOnce({
			data: {},
			status: 500,
			message: "",
		});

		const result = await login(null, payload);

		expect(result).toHaveProperty("message");
		expect(result?.message).toBe(
			"Ha ocurrido un error interno, por favor intente de nuevo más tarde",
		);
	});

	it("should set cookie and redirect on successful login", async () => {
		const payload = new FormData();
		payload.append("username", "testuser");
		payload.append("password", "testpassword");

		vi.mocked(POST).mockResolvedValueOnce({
			data: { access_token: "token" },
			status: 200,
			message: "",
		});

		const result = await login(null, payload);

		expect(result).toBeUndefined();

		expect(setCookie).toHaveBeenCalledWith(AUTH_COOKIE, "token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24,
			path: "/",
		});

		expect(redirect).toHaveBeenCalledWith("/dashboard");
	});
});
