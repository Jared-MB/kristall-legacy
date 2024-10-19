import { NEXT_TAGS } from "@/constants/tags";
import type { CreateUser, User } from "../interfaces";

import { GET, POST } from "@/core/modules/http";

export const getUsersService = async (query?: `?${string}`) => {
	return await GET<User[]>(`/users${query ?? ""}`, {
		tags: [NEXT_TAGS.GET_USERS],
	});
};

export const uploadUserService = async (user: CreateUser) => {
	return await POST<CreateUser, User>("/users", user);
};
