"use server";

import type { ServerResponse } from "@/core/services/http/interfaces";
import type { Authorized, Login } from "../interfaces";

import { POST } from "@/core/services/http";

const BASE_URL = "/auth/login";

export const loginService = async (
	payload: Login,
): Promise<ServerResponse<Authorized>> => {
	return await POST<Login, Authorized>(BASE_URL, payload);
};
