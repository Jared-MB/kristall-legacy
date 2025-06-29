"use server";

import type {
	Client,
	PrivateClient,
} from "@kristall/shared/domains/user-management/types";

import { GET } from "nexum";

import { adaptToPrivateClient } from "@kristall/shared/domains/user-management/adapters/to-private";
import { PRIVATE_CLIENTS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/clients/private";

import { CLIENTS_TAGS } from "../../constants/tags";

export const getAllClients = async (): Promise<PrivateClient[] | undefined> => {
	const { data } = await GET<Client[]>(PRIVATE_CLIENTS_ENDPOINTS.GET_CLIENTS, {
		tags: [CLIENTS_TAGS.ALL],
		cache: "force-cache",
	});

	return data?.map(adaptToPrivateClient);
};
