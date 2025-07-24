"use server";

import type {
	UpdateLocationFields,
	UpdateLocationResponse,
} from "../../types/location.private";

import { PATCH } from "@kristall/nexum";
import { STATUS } from "@kristall/nexum/status";

import { UpdateLocationSchema } from "@kristall/shared/domains/location-services/validators/update-location-validator";
import { PRIVATE_LOCATIONS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/locations/private";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";
import { FormExtractor } from "@kristall/shared/utils/forms/form-extractor";

import { LOCATIONS_TAGS } from "../../constants/tags";

export const updateLocation = async (
	_prev: unknown,
	data: FormData,
): Promise<UpdateLocationResponse> => {
	const rawData = Object.fromEntries(data.entries());

	const validatedFields = UpdateLocationSchema.safeParse(rawData);
	const fieldsKeys: (keyof UpdateLocationFields)[] = [
		"name",
		"address",
		"phone",
	];
	const fields = new FormExtractor(rawData, validatedFields.error);

	if (!validatedFields.success) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.INVALID_FIELDS,
				value: "Campos inválidos",
			},
			fields: fields.extractErrorsForFields(fieldsKeys),
		};
	}

	const { status } = await PATCH(
		PRIVATE_LOCATIONS_ENDPOINTS.UPDATE_LOCATION(
			validatedFields.data._id.toString(),
		),
		validatedFields.data,
		{ revalidateTags: [LOCATIONS_TAGS.ALL] },
	);

	if (status !== STATUS.OK) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
				value: "Error al editar la ubicación",
			},
			fields: fields.extractErrorsForFields(fieldsKeys),
		};
	}

	return {
		message: {
			type: FORM_MESSAGE_TYPES.SUCCESS,
			value: "Ubicación editada correctamente",
		},
		fields: fields.extractEmptyValuesForFields(fieldsKeys),
	};
};
