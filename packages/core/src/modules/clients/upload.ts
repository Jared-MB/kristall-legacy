import { POST } from "nexum";

import type { UploadClientResponse } from "./interfaces/client.interface";

import { FORM_MESSAGE_TYPES } from "@kristall/core/forms";
import { ZodErrorExtractor } from "../../utils/zod-error-extractor";
import { CLIENTS_TAGS } from "./constants/clients.tags";
import {
	type UploadClient,
	UploadClientSchema,
} from "./validators/client.validator";

export const uploadClient = async (
	_prev: unknown,
	data: FormData,
): Promise<UploadClientResponse> => {
	const rawData = Object.fromEntries(data.entries());

	const fieldsKeys: (keyof UploadClient)[] = ["_id", "name"];

	const validatedFields = UploadClientSchema.safeParse(rawData);
	const fields = new ZodErrorExtractor(rawData, validatedFields.error);

	const fieldValues = fields.extractErrorsForFields(fieldsKeys);

	if (!validatedFields.success) {
		return {
			fields: fieldValues,
		};
	}

	const { status, message } = await POST("/clients", validatedFields.data, {
		revalidateTags: [CLIENTS_TAGS.ALL],
	});

	if (status !== 201) {
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
