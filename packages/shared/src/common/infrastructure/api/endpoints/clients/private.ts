import type { Url } from "../../../../types/url";

export const BASE_CLIENTS_ENDPOINT = "clients";

export const PRIVATE_CLIENTS_ENDPOINTS = {
	BASE: BASE_CLIENTS_ENDPOINT,
	GET_CLIENTS: `/${BASE_CLIENTS_ENDPOINT}`,
	CREATE_CLIENT: `/${BASE_CLIENTS_ENDPOINT}`,
	UPDATE_CLIENT: (id: string): Url => `/${BASE_CLIENTS_ENDPOINT}/${id}`,
	DELETE_CLIENT: (id: string): Url => `/${BASE_CLIENTS_ENDPOINT}/${id}`,
} as const;
