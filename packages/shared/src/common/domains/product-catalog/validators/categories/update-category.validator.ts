import { z } from "zod";
import { UploadCategorySchema } from "./upload-category.validator";

export const UpdateCategorySchema = UploadCategorySchema.extend({
	_id: z.string().uuid(),
	isActive: z.boolean(),
});
