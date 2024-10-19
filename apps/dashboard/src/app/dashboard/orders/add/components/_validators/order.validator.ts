import { z } from "zod";

export const AddOrderSchema = z.object({
	client: z.string({
		required_error: "Debe seleccionar un cliente",
	}),
	location: z
		.string({
			required_error: "Debe seleccionar una ubicación",
		})
		.uuid(),
	cart: z
		.array(
			z.object({
				productId: z.string().uuid(),
				quantity: z.number().int().positive(),
				price: z.number().int().positive(),
				total: z.number().int().positive(),
				code: z.string().min(1).max(255),
				name: z.string().min(1).max(255),
				cost: z.number().int().positive().optional(),
			}),
		)
		.min(1, "Debe agregar al menos un producto al carrito"),
	paymentMethod: z.object(
		{
			type: z.enum(["cash", "card", "transfer", "pending"]),
			account: z.string().optional(),
		},
		{
			required_error: "Debe seleccionar un método de pago",
		},
	),
	advance: z.preprocess((val) => Number(val), z.number().int().min(0)),
	productsFrom: z.string().uuid(),
	cost: z.preprocess((val) => Number(val), z.number().int().min(0).optional()),
});
