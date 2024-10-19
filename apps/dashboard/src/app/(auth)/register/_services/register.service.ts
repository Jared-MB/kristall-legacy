"use server";

import type { RegisterUser } from "../_interfaces";

import type { Authorized } from "@/core/interfaces/auth";
import { PUT } from "@/core/modules/http";

export const registerUserService = async ({
	password,
	shopName,
	username,
	email,
}: RegisterUser) => {
	return await PUT<RegisterUser, Authorized>("/register?by=stripe", {
		password,
		shopName,
		username,
		email,
	});
};
