import type { ServerResponse } from "@/core/modules/http/interfaces";

import { NEXT_TAGS } from "@/constants/tags";
import { GET, PUT } from "@/core/modules/http";

const BASE_URL = "/user/permissions";

export const getUserAccessService = async (
	query: string,
): Promise<ServerResponse<string>> => {
	return await GET<string>(`${BASE_URL}?${query}`, {
		tags: [NEXT_TAGS.GET_USER_PERMISSIONS, NEXT_TAGS.GET_DASHBOARD_ACCESS],
	});
};

export const getUserPOSAccessService = async (
	query: string,
): Promise<ServerResponse<boolean>> => {
	return await GET<boolean>(`${BASE_URL}/pos?${query}`, {
		tags: [NEXT_TAGS.GET_USER_PERMISSIONS, NEXT_TAGS.GET_POS_ACCESS],
	});
};

export const updateUserPOSAccessService = async (query: string) => {
	return await PUT<any, string>(`${BASE_URL}/pos?${query}`, {});
};

export const updateUserAccessService = async (
	_id: string,
	permissions: string,
) => {
	return await PUT<{ _id: string; permissions: string }, string>(BASE_URL, {
		_id,
		permissions,
	});
};
