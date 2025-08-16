"use server";

import type { DeleteCategoryFields } from "../../types/categories/categories.private";

import { DELETE } from "@kristall/nexum";
import { STATUS } from "@kristall/nexum/status";

import { DeleteCategorySchema } from "@kristall/shared/domains/product-catalog/validators/categories/delete-category.validator";
import { CATEGORIES_PRIVATE_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/categories/private";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";
import { FormExtractor } from "@kristall/shared/utils/forms/form-extractor";

import { withAuth } from "../../../../utils/auth/with-auth";
import { CATEGORIES_TAGS } from "../../constants/tags/categories";

export const deleteCategory = withAuth(
	async (_session, _prevState: unknown, payload: FormData) => {
		const rawData = Object.fromEntries(payload.entries());
		const validatedFields = DeleteCategorySchema.safeParse(rawData);

		const fields = new FormExtractor(rawData, validatedFields.error);
		const fieldKeys: (keyof DeleteCategoryFields)[] = ["_id"];

		if (!validatedFields.success) {
			return {
				fields: fields.extractErrorsForFields(fieldKeys),
				message: {
					type: FORM_MESSAGE_TYPES.INVALID_FIELDS,
					value: "Campos inválidos",
				},
			};
		}

		const { status, message } = await DELETE(
			CATEGORIES_PRIVATE_ENDPOINTS.DELETE(validatedFields.data._id),
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
				fields: fields.extractErrorsForFields(fieldKeys),
			};
		}

		if (status !== STATUS.OK) {
			return {
				message: {
					type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
					value: "Error al eliminar la categoría",
				},
				fields: fields.extractErrorsForFields(fieldKeys),
			};
		}

		return {
			message: {
				type: FORM_MESSAGE_TYPES.SUCCESS,
				value: "Categoría eliminada exitosamente",
			},
			fields: fields.extractEmptyValuesForFields(fieldKeys),
		};
	},
);
