"use server";

import { logoutService } from "../services";

export const logout = async () => {
	await logoutService();
};
