"use server";

import { ServerConnection } from "@/utils/ServerConnection";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

/**
 * @deprecated
 */
export const loginConnection = async (payload: {
	username: string;
	password: string;
}) => {
	const connection = new ServerConnection("/auth/login", {
		noAuth: true,
	});
	return await connection.post<{ access_token: string }>(payload);
};

/**
 * @deprecated
 */
export const login = async (_prev: unknown, data: FormData) => {
	const rawData = {
		username: data.get("username")?.toString(),
		password: data.get("password")?.toString(),
	};

	try {
		const parsedData = loginSchema.parse(rawData);
		const data = await loginConnection(parsedData);

		if (!data) {
			return { message: "Usuario o contraseña incorrectos" };
		}

		(await cookies()).set("session", data.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24, // One week
			path: "/",
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			const errorData = JSON.parse(error.message);
			if (errorData.status === 401 || errorData.statusText === "Unauthorized") {
				return { message: "Usuario o contraseña incorrectos" };
			}
		}
		return { message: "Ocurrió un error, por favor intenta de nuevo" };
	}

	redirect("/dashboard");
};
