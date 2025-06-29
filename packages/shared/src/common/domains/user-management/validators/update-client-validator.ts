import { z } from "zod";

export const UpdateClientSchema = z.object({
	_id: z.string(),
	name: z.string().min(3).max(255),
});
