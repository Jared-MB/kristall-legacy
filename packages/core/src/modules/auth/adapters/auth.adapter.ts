"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginService, logoutService, registerService } from "../services";
import { LoginSchema, RegisterSchema } from "../validators";

export const login = async (_prevState: unknown, payload: FormData) => {
	const { username, password } = Object.fromEntries(payload.entries());

	const parsedData = LoginSchema.safeParse({
		username,
		password,
	});

	if (!parsedData.success) {
		return parsedData.error.flatten().fieldErrors;
	}

	const { data, status } = await loginService(parsedData.data);
	if (status === 401) {
		return { message: "Usuario o contraseña incorrectos" };
	}

	if (status !== 200) {
		return { message: "Internal server error" };
	}

	const { access_token } = data;

	const ONE_DAY = 60 * 60 * 24;

	(await cookies()).set("session", access_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: ONE_DAY,
		path: "/",
	});

	redirect("/dashboard");
};

export const logout = async () => {
	await logoutService();
};

export const register = async (_prevState: unknown, payload: FormData) => {
	const { username, password, confirmPassword, shopName, email } =
		Object.fromEntries(payload.entries());

	const parsedData = RegisterSchema.safeParse({
		username,
		password,
		shopName,
		email,
	});

	if (!parsedData.success) {
		return parsedData.error.flatten().fieldErrors;
	}

	if (password !== confirmPassword || !password || !confirmPassword) {
		return { confirmPassword: "Las contraseñas no coinciden" };
	}

	const { data, status } = await registerService(parsedData.data);
	if (data !== "ok" && status !== 200) {
		return { message: "Internal server error" };
	}

	return login(null, payload);
};
