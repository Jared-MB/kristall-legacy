"use server";

import { updatePasswordService } from "../services";

export const updatePassword = async (
	_prevState: unknown,
	payload: FormData,
) => {
	const { password, newPassword, confirmNewPassword } = Object.fromEntries(
		payload.entries(),
	);

	if (newPassword !== confirmNewPassword) {
		return {
			error: [
				{
					message: "Las contraseñas no coinciden",
					field: "confirmNewPassword",
				},
			],
		};
	}

	if (newPassword.toString().length < 8) {
		return {
			error: [
				{
					message: "La contraseña debe tener al menos 8 caracteres",
					field: "password",
				},
			],
		};
	}

	await updatePasswordService({
		password: password.toString(),
		newPassword: newPassword.toString(),
	});

	return "Contraseña actualizada correctamente";
};
