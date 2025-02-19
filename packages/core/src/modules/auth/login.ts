"use server";

import type { Authorized, LoginResponse, LoginUser } from "./interfaces";

import { POST } from "@kristall/http";
import { LoginSchema } from "./validators/auth.validator";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE } from "./constants/auth.constant";

import { ZodErrorExtractor } from "@kristall/core/utils/zod-error-extractor";

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

	const { data, status } = await POST<LoginUser, Authorized>(
		"/auth/login",
		parsedData.data,
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

	if (status !== 200) {
		return {
			message:
				"Ha ocurrido un error interno, por favor intente de nuevo más tarde",
			fields: inputs,
		};
	}

	const { access_token } = data;

	const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

	(await cookies()).set(AUTH_COOKIE, access_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: ONE_DAY_IN_SECONDS,
		path: "/",
	});

	redirect("/dashboard");
};
