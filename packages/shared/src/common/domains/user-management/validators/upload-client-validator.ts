import { z } from "zod";

export const UploadClientSchema = z.object({
	name: z.string().min(3).max(255),
});
