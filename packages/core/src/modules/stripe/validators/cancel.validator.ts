import { z } from "zod";

export const CancelSubscriptionSchema = z.object({
	password: z
		.string({ message: "Este campo es obligatorio" })
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.max(255, "La contraseña no puede tener más de 255 caracteres"),
	email: z
		.string({ message: "Este campo es obligatorio" })
		.email("Por favor ingresa un correo electrónico válido"),
	confirm: z.string({ message: "Este campo es obligatorio" }),
});
