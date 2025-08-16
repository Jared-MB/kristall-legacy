import { z } from "zod";

export const DeleteCategorySchema = z.object({
	_id: z.string().uuid(),
});
