"use server";

import type { UUID } from "node:crypto";
import type {
	UpdateCategoryFields,
	UpdateCategoryResponse,
} from "../../types/categories/categories.private";

import { PATCH } from "@kristall/nexum";
import { STATUS } from "@kristall/nexum/status";

import { toServerCategory } from "@kristall/shared/domains/product-catalog/adapters/to-server";
import { UpdateCategorySchema } from "@kristall/shared/domains/product-catalog/validators/categories/update-category.validator";
import { CATEGORIES_PRIVATE_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/categories/private";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";
import { FormExtractor } from "@kristall/shared/utils/forms/form-extractor";

import { withAuth } from "../../../../utils/auth/with-auth";
import { CATEGORIES_TAGS } from "../../constants/tags/categories";

export const updateCategory = withAuth(
	async (
		_session,
		_prevState: unknown,
		payload: FormData,
	): Promise<UpdateCategoryResponse> => {
		const rawData = Object.fromEntries(payload.entries());
		const validatedFields = UpdateCategorySchema.safeParse({
			_id: rawData._id,
			name: rawData.name,
			isActive: rawData?.isActive === "on",
		});

		const fields = new FormExtractor(rawData, validatedFields.error);
		const fieldKeys: (keyof UpdateCategoryFields)[] = [
			"name",
			"_id",
			"isActive",
		];

		if (!validatedFields.success) {
			return {
				fields: fields.extractErrorsForFields(fieldKeys),
				message: {
					type: FORM_MESSAGE_TYPES.INVALID_FIELDS,
					value: "Campos inválidos",
				},
			};
		}

		const { status, message } = await PATCH(
			CATEGORIES_PRIVATE_ENDPOINTS.UPDATE(validatedFields.data._id),
			toServerCategory({
				...validatedFields.data,
				_id: validatedFields.data._id as UUID,
			}),
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
					value: "Error al actualizar la categoría",
				},
				fields: fields.extractErrorsForFields(fieldKeys),
			};
		}

		return {
			message: {
				type: FORM_MESSAGE_TYPES.SUCCESS,
				value: "Categoría actualizada exitosamente",
			},
			fields: fields.extractEmptyValuesForFields(fieldKeys),
		};
	},
);
