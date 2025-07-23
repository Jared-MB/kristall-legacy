import { z } from "zod";

export const LoginSchema = z.object({
	username: z
		.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
	password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});
