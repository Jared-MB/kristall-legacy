import { z } from "zod";

export const UploadLocationSchema = z.object({
	name: z.string().min(3).max(255),
	address: z.string().optional(),
	phone: z.preprocess(
		(val) => (Number(val) === 0 ? null : Number(val)),
		z.number().int().min(0).max(9999999999).nullable(),
	),
});
