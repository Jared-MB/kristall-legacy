"use server";

import { revalidateTag } from "next/cache";

import { uploadCategoryService } from "./services/upload";

import { CATEGORIES_TAGS } from "./constants";

export const uploadCategory = async (
	_prevState: unknown,
	payload: FormData,
) => {
	const name = payload.get("name")?.toString();

	if (!name) {
		return {
			name: "El nombre es requerido",
		};
	}
	if (name.length < 3) {
		return {
			name: "El nombre debe tener al menos 3 caracteres",
		};
	}

	try {
		await uploadCategoryService(name);
	} catch (error) {
		return {
			message: "Error al subir la categoría",
		};
	}

	revalidateTag(CATEGORIES_TAGS.DETAILS);
	return {
		success: true,
	};
};
