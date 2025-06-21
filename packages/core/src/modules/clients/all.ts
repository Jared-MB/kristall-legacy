"use server";

import { GET } from "nexum";

import { CLIENTS_TAGS } from "./constants/clients.tags";
import type { Client } from "./interfaces/client.interface";

export const getAllClients = async (): Promise<Client[] | undefined> => {
	const { data } = await GET<Client[]>("/clients", {
		tags: [CLIENTS_TAGS.ALL],
		cache: "force-cache",
	});
	return data;
};

export const getClientByName = async (
	name: string,
): Promise<Client[] | undefined> => {
	const { data } = await GET<Client[]>(`/clients?name=${name}`, {
		tags: [CLIENTS_TAGS.NAME(name)],
	});

	return data;
};
