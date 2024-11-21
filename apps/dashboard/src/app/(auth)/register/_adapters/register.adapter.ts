"use server";

import { registerUserService } from "../_services";
import { RegisterSchema } from "../_validators";

export const registerUser = async (_prevState: unknown, payload: FormData) => {
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

	try {
		const data = await registerUserService({
			username: username.toString(),
			password: password.toString(),
			shopName: shopName.toString(),
			email: email.toString(),
		});
		console.log(data);
	} catch (err: unknown) {
		console.log(err);
		return { message: "Internal server error" };
	}
	console.log("Registered");
	// await login(null, payload);
};
