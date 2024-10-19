"use server";

import type { Category } from "@/types/category";

import { ServerConnection } from "@/utils/ServerConnection";
import { CategoriesConnection } from "@/utils/connections";

/**
 * @deprecated
 */
export const getCategories = async () =>
	await CategoriesConnection.get<Category[]>();

/**
 * @deprecated
 */
export const addCategory = async (_prev: unknown, payload: FormData) => {
	const name = payload.get("name")?.toString();
	if (!name)
		return {
			errors: {
				name: ["El nombre es requerido"],
			},
		};

	try {
		await CategoriesConnection.post<Category>({
			name,
		});
	} catch (error) {
		if (error instanceof Error) {
			return {
				errors: {
					message: JSON.parse(error.message).statusText,
				},
			};
		}
		return {
			errors: "Error",
		};
	}

	return {
		message: "Success",
	};
};

/**
 * @deprecated
 */
export const updateCategories = async (_prev: unknown, payload: FormData) => {
	const name = payload.get("name")?.toString();
	const _id = payload.get("_id")?.toString();
	if (!name)
		return {
			errors: {
				name: ["El nombre es requerido"],
			},
		};

	try {
		await new ServerConnection(`/categories/${_id}`).put({
			_id,
			name,
		});
	} catch (error) {
		if (error instanceof Error) {
			return {
				errors: {
					message: JSON.parse(error.message).statusText,
				},
			};
		}
		return {
			errors: "Error",
		};
	}

	return {
		message: "Success",
	};
};
