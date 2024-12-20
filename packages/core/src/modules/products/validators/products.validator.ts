import { z } from "zod";

export const AddProductSchema = z.object({
	_id: z.string().uuid().optional(),
	name: z
		.string()
		.min(3, "El nombre debe tener al menos 3 caracteres")
		.max(255),
	code: z.preprocess((val) => Number(val), z.number().int().min(0).optional()),
	price: z.preprocess(
		(val) => Number(val),
		z
			.number()
			.positive("El precio debe ser mayor a 0")
			.min(1, "El precio es requerido"),
	),
	cost: z.preprocess(
		(val) => Number(val),
		z.number().min(0, "El costo debe ser mayor a 0").optional(),
	),
	category: z.string().uuid("La categoría es requerida").optional(),
	locations: z
		.array(
			z.object({
				locationId: z.string().uuid(),
				stock: z.number().int().min(0),
				_id: z.string().uuid().optional(),
				productId: z.string().uuid().optional(),
			}),
		)
		.min(1, "Debes agregar al menos una ubicación"),
	batches: z
		.array(
			z.object({
				expirationDate: z.date().optional(),
				locationProduct: z.object({
					_id: z.string().uuid().optional(),
					locationId: z.string().uuid(),
					stock: z.number().int().min(0),
					productId: z.string().uuid().optional(),
				}),
				batchNumber: z.number().int().min(0),
				stock: z.number().int().min(0),
				_id: z.string().uuid().optional(),
			}),
		)
		.optional(),
	batchEnabled: z.boolean(),
});

export const UpdateProductSchema = AddProductSchema;
