import { z } from "zod";

export const AddLocationSchema = z.object({
	_id: z.string().uuid().optional(),
	name: z.string().min(3).max(255),
	address: z.string().optional(),
	phone: z.preprocess(
		(val) => (Number(val) === 0 ? null : Number(val)),
		z.number().int().min(0).max(9999999999).nullable(),
	),
});

export type AddLocation = z.infer<typeof AddLocationSchema>;
