"use server";

import type {
	UploadLocationFields,
	UploadLocationResponse,
} from "../../types/location.private";

import { POST } from "@kristall/nexum";
import { STATUS } from "@kristall/nexum/status";

import { UploadLocationSchema } from "@kristall/shared/domains/location-services/validators/upload-location-validator";
import { PRIVATE_LOCATIONS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/locations/private";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms";
import { FormExtractor } from "@kristall/shared/utils/forms/form-extractor";

import { LOCATIONS_TAGS } from "../../constants/tags";

export const uploadLocation = async (
	_prev: unknown,
	data: FormData,
): Promise<UploadLocationResponse> => {
	const rawData = Object.fromEntries(data.entries());

	const validatedFields = UploadLocationSchema.safeParse(rawData);

	const fieldsKeys: (keyof UploadLocationFields)[] = [
		"name",
		"address",
		"phone",
	];
	const fields = new FormExtractor(rawData, validatedFields.error);

	const fieldErrors = fields.extractErrorsForFields(fieldsKeys);

	if (!validatedFields.success) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.INVALID_FIELDS,
				value: "Campos inválidos",
			},
			fields: fieldErrors,
		};
	}

	const { status, message } = await POST(
		PRIVATE_LOCATIONS_ENDPOINTS.CREATE_LOCATION,
		validatedFields.data,
		{
			revalidateTags: [LOCATIONS_TAGS.ALL],
		},
	);

	if (status === STATUS.FORBIDDEN) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.SUBSCRIPTION_FEATURE_LIMIT_REACHED,
				value: message,
			},
			fields: fieldErrors,
		};
	}

	if (status !== STATUS.CREATED) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
				value: "Error al agregar la ubicación",
			},
			fields: fieldErrors,
		};
	}

	return {
		message: {
			type: FORM_MESSAGE_TYPES.SUCCESS,
			value: "Ubicación agregada correctamente",
		},
		fields: fields.extractEmptyValuesForFields(fieldsKeys),
	};
};
