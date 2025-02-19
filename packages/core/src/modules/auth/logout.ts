"use server";

import { deleteCookie } from "@kristall/core/utils/cookies";
import { redirect } from "next/navigation";
import { AUTH_COOKIE } from "./constants/auth.constant";

export const logout = async () => {
	deleteCookie(AUTH_COOKIE);
	redirect("/login");
};
