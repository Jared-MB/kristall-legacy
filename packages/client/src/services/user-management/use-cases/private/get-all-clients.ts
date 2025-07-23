"use server";

import type {
	Client,
	ClientStatus,
	PrivateClient,
} from "@kristall/shared/domains/user-management/types";

import { GET } from "@kristall/nexum";

import { adaptToPrivateClient } from "@kristall/shared/domains/user-management/adapters/to-private";
import { PRIVATE_CLIENTS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/clients/private";

import { withAuth } from "../../../../utils/auth/with-auth";
import { CLIENTS_TAGS } from "../../constants/tags/clients";

export const getAllClients = withAuth(
	async (
		_session,
		{ status }: { status: ClientStatus },
	): Promise<PrivateClient[] | undefined> => {
		const { data } = await GET<Client[]>(
			`${PRIVATE_CLIENTS_ENDPOINTS.GET_CLIENTS}?status=${status}`,
			{
				tags: [CLIENTS_TAGS.ALL(status)],
				cache: "force-cache",
			},
		);

		return data?.map(adaptToPrivateClient);
	},
);
