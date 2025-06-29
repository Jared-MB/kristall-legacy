"use server";

import type { UploadClient } from "@kristall/shared/domains/user-management/types";
import type { UploadClientResponse } from "../../types";

import { POST } from "nexum";
import { STATUS } from "nexum/status";

import { UploadClientSchema } from "@kristall/shared/domains/user-management/validators/upload-client-validator";
import { PRIVATE_CLIENTS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/clients/private";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms";
import { FormExtractor } from "@kristall/shared/utils/forms/form-extractor";

import { CLIENTS_TAGS } from "../../constants/tags";

export const uploadClient = async (
	_prev: unknown,
	data: FormData,
): Promise<UploadClientResponse> => {
	const rawData = Object.fromEntries(data.entries());

	const fieldsKeys: (keyof UploadClient)[] = ["name"];

	const validatedFields = UploadClientSchema.safeParse(rawData);
	const fields = new FormExtractor(rawData, validatedFields.error);

	const fieldValues = fields.extractErrorsForFields(fieldsKeys);

	if (!validatedFields.success) {
		return {
			fields: fieldValues,
		};
	}

	const { status, message } = await POST(
		PRIVATE_CLIENTS_ENDPOINTS.CREATE_CLIENT,
		validatedFields.data,
		{
			revalidateTags: [CLIENTS_TAGS.ALL],
		},
	);

	if (status !== STATUS.CREATED) {
		return {
			fields: fieldValues,
			message: {
				type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
				value: message,
			},
		};
	}

	return {
		fields: fields.extractEmptyValuesForFields(fieldsKeys),
		message: {
			type: FORM_MESSAGE_TYPES.SUCCESS,
			value: "Cliente agregado correctamente",
		},
	};
};
