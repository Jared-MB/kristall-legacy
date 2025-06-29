"use server";

import type { UpdateClient } from "@kristall/shared/domains/user-management/types";
import type { UpdateClientResponse } from "../../types";

import { PATCH } from "nexum";

import { UpdateClientSchema } from "@kristall/shared/domains/user-management/validators/update-client-validator";
import { PRIVATE_CLIENTS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/clients/private";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms";
import { FormExtractor } from "@kristall/shared/utils/forms/form-extractor";
import { STATUS } from "nexum/status";
import { CLIENTS_TAGS } from "../../constants/tags";

export const updateClient = async (
	_prev: unknown,
	data: FormData,
): Promise<UpdateClientResponse> => {
	const rawData = Object.fromEntries(data.entries());

	const parsedData = UpdateClientSchema.safeParse(rawData);
	const fieldsKeys: (keyof UpdateClient)[] = ["name", "_id"];

	const form = new FormExtractor(rawData, parsedData.error);

	const { value: clientId } = form.extractValue("_id");

	if (!clientId) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
				value: "Ocurrió un error al editar el cliente",
			},
			fields: form.extractErrorsForFields(fieldsKeys),
		};
	}

	if (!parsedData.success) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
				value: "Campos inválidos",
			},
			fields: form.extractErrorsForFields(fieldsKeys),
		};
	}

	const { status } = await PATCH(
		PRIVATE_CLIENTS_ENDPOINTS.UPDATE_CLIENT(clientId),
		parsedData.data,
		{
			revalidateTags: [CLIENTS_TAGS.ALL],
		},
	);

	if (status !== STATUS.OK) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
				value: "Ocurrió un error al editar el cliente",
			},
			fields: form.extractErrorsForFields(fieldsKeys),
		};
	}

	return {
		message: {
			type: FORM_MESSAGE_TYPES.SUCCESS,
			value: "Cliente editado correctamente",
		},
		fields: form.extractEmptyValuesForFields(fieldsKeys),
	};
};
