"use server";

import type { DeleteClientResponse } from "../../types";

import { DELETE } from "@kristall/nexum";
import { STATUS } from "@kristall/nexum/status";

import { ClientStatus } from "@kristall/shared/domains/user-management/types";
import { PRIVATE_CLIENTS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/clients/private";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms";
import { CLIENTS_TAGS } from "../../constants/tags/clients";

export const deleteClient = async (
	_prev: unknown,
	data: FormData,
): Promise<DeleteClientResponse> => {
	const rawData = Object.fromEntries(data.entries());

	const _id = rawData._id?.toString();

	if (!_id)
		return {
			fields: null,
			message: {
				type: FORM_MESSAGE_TYPES.MISSING_INTERNAL_FIELDS,
				value: "Error al eliminar el cliente",
			},
		};

	const { status } = await DELETE(
		PRIVATE_CLIENTS_ENDPOINTS.DELETE_CLIENT(_id),
		null,
		{
			revalidateTags: [
				CLIENTS_TAGS.ALL(ClientStatus.ACTIVE),
				CLIENTS_TAGS.ALL(ClientStatus.INACTIVE),
			],
		},
	);

	if (status !== STATUS.OK) {
		return {
			message: {
				type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
				value: "Error al eliminar el cliente",
			},
			fields: null,
		};
	}

	return {
		message: {
			type: FORM_MESSAGE_TYPES.SUCCESS,
			value: "Cliente eliminado correctamente",
		},
		fields: null,
	};
};
