import { z } from "zod";

/**
 * @deprecated
 */
export const AddOrderSchema = z.object({
	client: z.string(),
	location: z.string().uuid(),
	cart: z.array(
		z.object({
			productId: z.string().uuid(),
			quantity: z.number().int().positive(),
			price: z.number().int().positive(),
			total: z.number().int().positive(),
			code: z.string().min(1).max(255),
			name: z.string().min(1).max(255),
			cost: z.number().int().positive().optional(),
		}),
	),
	paymentMethod: z.object({
		type: z.enum(["cash", "card", "transfer", "pending"]),
		account: z.string().optional(),
	}),
	advance: z.preprocess((val) => Number(val), z.number().int().min(0)),
	productsFrom: z.string().uuid(),
	cost: z.preprocess((val) => Number(val), z.number().int().min(0).optional()),
});

/**
 * @deprecated
 */
export type AddOrder = z.infer<typeof AddOrderSchema>;
