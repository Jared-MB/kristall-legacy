"use server";

import type { Authorized } from "@/core/interfaces/auth";
import type { ServerResponse } from "@/core/interfaces/http";
import type { Login } from "../_interfaces";

import { POST } from "@/core/modules/http";

const BASE_URL = "/auth/login";

export const loginService = async (
	payload: Login,
): Promise<ServerResponse<Authorized>> => {
	return await POST<Login, Authorized>(BASE_URL, payload);
};
