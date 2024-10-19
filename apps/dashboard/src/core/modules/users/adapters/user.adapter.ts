"use server";

import type { User } from "../interfaces";

import { revalidateTag } from "next/cache";

import { NEXT_TAGS } from "@/constants/tags";
import { getUsersService, uploadUserService } from "../services";
import { CreateUserSchema } from "../validators";

interface GetUsersParams {
	username?: boolean;
	name?: boolean;
	role?: boolean;
	email?: boolean;
}

export const getUsers = async <T>(
	options?: GetUsersParams,
): Promise<User[] | T> => {
	let queryString: undefined | string = undefined;
	let query: undefined | `?${string}` = undefined;
	if (options) {
		const stringifiedOptions = Object.entries(options);
		queryString = new URLSearchParams(stringifiedOptions).toString();
		query = `?${queryString}`;
	}
	const { data } = await getUsersService(query);
	return data;
};

export const uploadUser = async (_prevState: unknown, payload: FormData) => {
	const { email, username, name, password, confirmPassword } =
		Object.fromEntries(payload.entries());

	if (password.toString() !== confirmPassword.toString()) {
		return {
			password: ["Passwords do not match"],
			confirmPassword: ["Passwords do not match"],
		};
	}

	const parsedData = CreateUserSchema.safeParse({
		email,
		username,
		name,
		password,
		confirmPassword,
	});

	if (!parsedData.success) {
		return parsedData.error.flatten().fieldErrors;
	}

	try {
		await uploadUserService(parsedData.data);
	} catch (error) {
		if (error instanceof Error) {
			return {
				error: [error.message],
			};
		}
		return {
			error: ["Error al crear usuario"],
		};
	}

	revalidateTag(NEXT_TAGS.GET_USERS);
	return {
		success: ["Usuario creado correctamente"],
	};
};
