"use server";

import type { RegisterResponse, RegisterUser } from "./interfaces";

import { ZodErrorExtractor } from "@kristall/core/utils/zod-error-extractor";
import { PUT } from "@kristall/http";
import { login } from "./login";
import { RegisterSchema } from "./validators/auth.validator";

export const register = async (
	_prevState: unknown,
	payload: FormData,
): Promise<RegisterResponse | undefined> => {
	const rawPayload = Object.fromEntries(payload.entries());

	const parsedData = RegisterSchema.safeParse(rawPayload);
	const { confirmPassword, password } = rawPayload;

	const fields = new ZodErrorExtractor(rawPayload, parsedData.error);
	const fieldNames = [
		"username",
		"password",
		"email",
		"shopName",
	] as (keyof RegisterUser)[];

	if (!parsedData.success) {
		return {
			fields: {
				...fields.extractErrorsForFields(fieldNames),
				confirmPassword: {
					value: confirmPassword.toString(),
					message: "",
				},
			},
		};
	}

	if (password !== confirmPassword || !password || !confirmPassword) {
		return {
			fields: {
				...fields.extractErrorsForFields(fieldNames),
				confirmPassword: {
					value: confirmPassword.toString(),
					message: "Las contraseñas no coinciden",
				},
			},
		};
	}

	const { data, status } = await PUT<RegisterUser, "ok">(
		"/register?by=stripe",
		parsedData.data,
		{
			auth: false,
		},
	);
	if (data !== "ok" && status !== 200) {
		return {
			message: {
				type: "error",
				value:
					"Ha ocurrido un error interno, por favor intente de nuevo más tarde",
			},
			fields: {
				...fields.extractErrorsForFields(fieldNames),
				confirmPassword: {
					value: confirmPassword.toString(),
					message: "",
				},
			},
		};
	}

	await login(null, payload);
	return;
};
