"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ServerError } from "@/core/utils/errors";

import { loginService } from "../services";
import { LoginSchema } from "../validators";

export const login = async (_prevState: unknown, data: FormData) => {
	const { username, password } = Object.fromEntries(data.entries());

	const parsedData = LoginSchema.safeParse({
		username,
		password,
	});

	if (!parsedData.success) {
		return parsedData.error.flatten().fieldErrors;
	}

	try {
		const { data } = await loginService(parsedData.data);
		const { access_token } = data;

		cookies().set("session", access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24, // One week
			path: "/",
		});
	} catch (err: unknown) {
		console.log(err);
		if (err instanceof ServerError && err.status === 401) {
			return { message: "Usuario o contraseña incorrectos" };
		}
		if (
			err instanceof Error &&
			Object.entries(err).flat()[1].code === "ECONNREFUSED"
		) {
			return {
				message: "No se pudo conectar con el servidor, intente más tarde",
			};
		}
		return { message: "Internal server error" };
	}
	redirect("/");
};

export const logout = async (): Promise<void> => {
	cookies().delete("session");
	redirect("/login");
};
