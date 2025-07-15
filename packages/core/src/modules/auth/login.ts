"use server";

import type { Authorized, LoginResponse, LoginUser } from "./interfaces";

import { POST } from "@kristall/nexum";
import { LoginSchema } from "./validators/auth.validator";

import { redirect } from "next/navigation";
import { AUTH_COOKIE } from "./constants/auth.constant";

import { setCookie } from "@kristall/core/utils/cookies";
import { ZodErrorExtractor } from "@kristall/core/utils/zod-error-extractor";
import { FORM_MESSAGE_TYPES } from "../../interfaces/form-error";

export const login = async (
	_prevState: unknown,
	payload: FormData,
): Promise<LoginResponse | undefined> => {
	const { username, password } = Object.fromEntries(payload.entries());

	const parsedData = LoginSchema.safeParse({
		username,
		password,
	});

	const fields = new ZodErrorExtractor(
		{ username, password },
		parsedData.error,
	);

	const inputs = fields.extractErrorsForFields(["username", "password"]);

	if (!parsedData.success) {
		return {
			fields: inputs,
		};
	}

	const { data, status, message } = await POST<Authorized, LoginUser>(
		"/auth/login",
		parsedData.data,
		{
			auth: false,
			revalidateTags: "never",
		},
	);

	if (status === 401) {
		return {
			fields: {
				username: {
					value: username.toString(),
					message: "Usuario o contraseña incorrectos",
				},
				password: {
					value: password.toString(),
					message: "Usuario o contraseña incorrectos",
				},
			},
		};
	}

	if (status === 402) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.PAYMENT_REQUIRED,
				value: message,
			},
			fields: inputs,
		};
	}

	if (status !== 200 || !data) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
				value:
					"Ha ocurrido un error interno, por favor intente de nuevo más tarde",
			},
			fields: inputs,
		};
	}

	const { access_token } = data;

	const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

	await setCookie(AUTH_COOKIE, access_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: ONE_DAY_IN_SECONDS,
		path: "/",
	});

	redirect("/dashboard");
};
