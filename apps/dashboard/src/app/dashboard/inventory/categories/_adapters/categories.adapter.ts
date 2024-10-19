"use server";

import { NEXT_TAGS } from "@/constants/tags";
import { revalidateTag } from "next/cache";
import type { CategoryDetail } from "../_interfaces";
import { getCategoriesService, uploadCategoryService } from "../_services";

export const getCategories = async (): Promise<CategoryDetail[]> => {
	const { data } = await getCategoriesService();
	return data;
};

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

	revalidateTag(NEXT_TAGS.GET_CATEGORIES_DETAILS);
	return {
		success: true,
	};
};
