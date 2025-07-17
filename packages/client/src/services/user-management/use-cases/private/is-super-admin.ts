"use server";

import { GET } from "@kristall/nexum";

import { PRIVATE_USERS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/users/private";

import { USER_TAGS } from "../../constants/tags/user";

export const isSuperAdmin = async (): Promise<boolean> => {
	const { data } = await GET<boolean>(PRIVATE_USERS_ENDPOINTS.IS_SUPER_ADMIN, {
		tags: [USER_TAGS.IS_SUPER_ADMIN],
	});
	return data ?? false;
};
