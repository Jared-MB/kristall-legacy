import { PUT } from "@/core/modules/http";

interface PasswordChange {
	password: string;
	newPassword: string;
}

export const updatePasswordService = async (passwords: PasswordChange) => {
	return await PUT<PasswordChange, unknown>(
		"/users/change/password",
		passwords,
	);
};
