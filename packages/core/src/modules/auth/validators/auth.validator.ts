import { z } from "zod";

export const RegisterSchema = z.object({
	username: z
		.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
		.max(255, "El nombre de usuario no puede tener más de 255 caracteres"),
	password: z
		.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.max(255, "La contraseña no puede tener más de 255 caracteres"),
	shopName: z
		.string()
		.min(3, "El nombre del negocio debe tener al menos 3 caracteres")
		.max(255, "El nombre del negocio no puede tener más de 255 caracteres"),
	email: z.string().email(),
});

export const LoginSchema = z.object({
	username: z
		.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
	password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});
