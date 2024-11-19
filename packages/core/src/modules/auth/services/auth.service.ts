"use server";

import type { Authorized, LoginUser, RegisterUser } from "../interfaces";

import { deleteCookie } from "@kristall/core/utils";
import { POST, PUT } from "@kristall/http";
import type { ServerResponse } from "@kristall/http/interfaces";
import { redirect } from "next/navigation";
import { AUTH_COOKIE } from "../constants";

export const loginService = async (
	data: LoginUser,
): Promise<ServerResponse<Authorized>> => {
	return await POST<LoginUser, Authorized>("/auth/login", data);
};

export const logoutService = async () => {
	deleteCookie(AUTH_COOKIE);
	redirect("/login");
};

export const registerService = async (
	data: RegisterUser,
): Promise<ServerResponse<"ok">> => {
	return await PUT<RegisterUser, "ok">("/register?by=stripe", data);
};
