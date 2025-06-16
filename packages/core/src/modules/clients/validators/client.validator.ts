import { z } from "zod";

export const UploadClientSchema = z.object({
	_id: z.string().uuid().optional(),
	name: z.string().min(3).max(255),
});

export type UploadClient = z.infer<typeof UploadClientSchema>;
