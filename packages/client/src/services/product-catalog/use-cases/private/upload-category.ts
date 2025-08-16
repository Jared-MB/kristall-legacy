"use server";

import type { UploadCategoryResponse } from "../../types/categories/categories.private";

import { POST } from "@kristall/nexum";
import { STATUS } from "@kristall/nexum/status";

import { UploadCategorySchema } from "@kristall/shared/domains/product-catalog/validators/categories/upload-category.validator";
import { CATEGORIES_PRIVATE_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/categories/private";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";
import { FormExtractor } from "@kristall/shared/utils/forms/form-extractor";

import { withAuth } from "../../../../utils/auth/with-auth";
import { CATEGORIES_TAGS } from "../../constants/tags/categories";

export const uploadCategory = withAuth(
	async (
		_session,
		_prevState: unknown,
		payload: FormData,
	): Promise<UploadCategoryResponse> => {
		const rawData = Object.fromEntries(payload.entries());
		const validatedFields = UploadCategorySchema.safeParse(rawData);

		const fields = new FormExtractor(rawData, validatedFields.error);

		if (!validatedFields.success) {
			return {
				fields: fields.extractErrorsForFields(["name"]),
				message: {
					type: FORM_MESSAGE_TYPES.INVALID_FIELDS,
					value: "Campos inválidos",
				},
			};
		}

		const { status, message } = await POST(
			CATEGORIES_PRIVATE_ENDPOINTS.UPLOAD,
			validatedFields.data,
			{
				revalidateTags: [CATEGORIES_TAGS.DETAILS, CATEGORIES_TAGS.ALL],
			},
		);

		if (status === STATUS.BAD_REQUEST) {
			return {
				message: {
					type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
					value: message,
				},
				fields: fields.extractErrorsForFields(["name"]),
			};
		}

		if (status !== STATUS.CREATED) {
			return {
				message: {
					type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
					value: "Error al crear la categoría",
				},
				fields: fields.extractErrorsForFields(["name"]),
			};
		}

		return {
			message: {
				type: FORM_MESSAGE_TYPES.SUCCESS,
				value: "Categoría creada exitosamente",
			},
			fields: fields.extractEmptyValuesForFields(["name"]),
		};
	},
);
