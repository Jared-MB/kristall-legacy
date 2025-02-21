import { describe, vi } from "vitest";

import { z } from "zod";
import { ZodErrorExtractor } from "./zod-error-extractor";

const schema = z.object({
	username: z
		.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
	password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

describe("ZodErrorExtractor", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Should extract errors for all fields", () => {
		const parsedData = schema.safeParse({ username: "test", password: "test" });

		const errors = new ZodErrorExtractor(
			{ username: "test", password: "test" },
			parsedData.error,
		);
		expect(errors.extractErrorsForFields(["username", "password"])).toEqual({
			username: {
				value: "test",
				message: "",
			},
			password: {
				value: "test",
				message: "La contraseña debe tener al menos 8 caracteres",
			},
		});

		expect(errors.extractErrorsForFields(["password"])).toEqual({
			password: {
				value: "test",
				message: "La contraseña debe tener al menos 8 caracteres",
			},
		});
	});

	test("Should extract the error message for a given field", () => {
		const parsedData = schema.safeParse({ username: "test", password: "test" });

		const errors = new ZodErrorExtractor(
			{ username: "test", password: "test" },
			parsedData.error,
		);

		expect(errors.extractError("username")).toEqual({
			value: "test",
			message: "",
		});

		expect(errors.extractError("password")).toEqual({
			value: "test",
			message: "La contraseña debe tener al menos 8 caracteres",
		});
	});
});
