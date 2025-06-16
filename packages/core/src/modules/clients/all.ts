"use server";

import { GET } from "nexum";

import { CLIENTS_TAGS } from "./constants/clients.tags";
import type { Client } from "./interfaces/client.interface";

export const getAllClients = async () => {
	const { data } = await GET<Client[]>("/clients", {
		tags: [CLIENTS_TAGS.ALL],
	});
	return data;
};
