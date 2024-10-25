"use server";

import { deleteCookie } from "@kristall/core/utils";
import { redirect } from "next/navigation";
import { AUTH_COOKIE } from "../constants";

export const logoutService = async () => {
	deleteCookie(AUTH_COOKIE);
	redirect("/login");
};
